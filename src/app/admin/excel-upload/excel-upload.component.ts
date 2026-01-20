import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToasterService } from '../../core/services/toaster.service';

interface UploadStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface SheetData {
  name: string;
  headers: string[];
  rows: any[][];
  rowCount: number;
}

interface ColumnMapping {
  sourceColumn: string;
  targetField: string;
  required: boolean;
  mapped: boolean;
}

interface ValidationError {
  row: number;
  column: string;
  message: string;
  severity: 'error' | 'warning';
}

@Component({
  selector: 'app-excel-upload',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './excel-upload.component.html',
})
export class ExcelUploadComponent implements OnInit {

  currentStep = signal<number>(1);
  totalSteps = 5;
  
  steps: UploadStep[] = [
    { id: 1, title: 'Select File', description: 'Upload your Excel file', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
    { id: 2, title: 'Preview', description: 'Review sheet data', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 3, title: 'Map Columns', description: 'Match columns to fields', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { id: 4, title: 'Validate', description: 'Check for errors', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 5, title: 'Complete', description: 'Upload summary', icon: 'M5 13l4 4L19 7' }
  ];

  // File state
  selectedFile = signal<File | null>(null);
  isDragOver = signal<boolean>(false);
  isProcessing = signal<boolean>(false);
  uploadProgress = signal<number>(0);

  // Sheet data
  sheets = signal<SheetData[]>([]);
  selectedSheetIndex = signal<number>(0);
  
  selectedSheet = computed(() => {
    const sheetList = this.sheets();
    const index = this.selectedSheetIndex();
    return sheetList[index] || null;
  });

  // Column mapping
  columnMappings = signal<ColumnMapping[]>([]);
  targetFields = [
    { name: 'clientCode', label: 'Client Code', required: true },
    { name: 'firstName', label: 'First Name', required: true },
    { name: 'lastName', label: 'Last Name', required: true },
    { name: 'email', label: 'Email', required: true },
    { name: 'phone', label: 'Phone', required: false },
    { name: 'accountType', label: 'Account Type', required: false },
    { name: 'portfolioValue', label: 'Portfolio Value', required: false },
    { name: 'status', label: 'Status', required: false }
  ];

  // Validation
  validationErrors = signal<ValidationError[]>([]);
  validationWarnings = signal<ValidationError[]>([]);
  isValidating = signal<boolean>(false);
  validationComplete = signal<boolean>(false);

  // Upload results
  uploadResults = signal<{
    total: number;
    success: number;
    failed: number;
    skipped: number;
  }>({ total: 0, success: 0, failed: 0, skipped: 0 });

  acceptedFileTypes = '.xlsx, .xls, .csv';
  maxFileSize = 10 * 1024 * 1024; // 10MB

  constructor(
    private router: Router,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {}

  // File handling
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File): void {
    // Validate file type
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
                       'application/vnd.ms-excel', 'text/csv'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls|csv)$/i)) {
      this.toasterService.error('Please upload a valid Excel or CSV file');
      return;
    }

    // Validate file size
    if (file.size > this.maxFileSize) {
      this.toasterService.error('File size exceeds 10MB limit');
      return;
    }

    this.selectedFile.set(file);
    this.processFile(file);
  }

  processFile(file: File): void {
    this.isProcessing.set(true);
    
    // Simulate file processing
    setTimeout(() => {
      // Mock sheet data
      this.sheets.set([
        {
          name: 'Clients',
          headers: ['Client ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Account Type', 'Portfolio Value', 'Status'],
          rows: [
            ['CLT001', 'John', 'Smith', 'john.smith@email.com', '+1 555-0101', 'Individual', '250000', 'Active'],
            ['CLT002', 'Sarah', 'Johnson', 'sarah.j@email.com', '+1 555-0102', 'Joint', '450000', 'Active'],
            ['CLT003', 'Michael', 'Williams', 'mwilliams@email.com', '+1 555-0103', 'Corporate', '1200000', 'Pending'],
            ['CLT004', 'Emily', 'Brown', 'emily.brown@email.com', '+1 555-0104', 'Individual', '175000', 'Active'],
            ['CLT005', 'David', 'Miller', 'dmiller@email.com', '+1 555-0105', 'Trust', '890000', 'Active'],
          ],
          rowCount: 5
        }
      ]);
      
      this.isProcessing.set(false);
      this.toasterService.success('File processed successfully');
    }, 1500);
  }

  removeFile(): void {
    this.selectedFile.set(null);
    this.sheets.set([]);
    this.columnMappings.set([]);
    this.validationErrors.set([]);
    this.validationWarnings.set([]);
  }

  // Navigation
  nextStep(): void {
    if (this.currentStep() < this.totalSteps) {
      if (this.currentStep() === 2) {
        this.initializeColumnMappings();
      }
      if (this.currentStep() === 3) {
        this.runValidation();
      }
      if (this.currentStep() === 4) {
        this.performUpload();
      }
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  goToStep(step: number): void {
    if (step <= this.currentStep()) {
      this.currentStep.set(step);
    }
  }

  canProceed(): boolean {
    switch (this.currentStep()) {
      case 1:
        return this.selectedFile() !== null && !this.isProcessing();
      case 2:
        return this.sheets().length > 0;
      case 3:
        return this.columnMappings().filter(m => m.required && m.mapped).length === 
               this.targetFields.filter(f => f.required).length;
      case 4:
        return this.validationComplete() && this.validationErrors().length === 0;
      default:
        return true;
    }
  }

  // Column mapping
  initializeColumnMappings(): void {
    const sheet = this.selectedSheet();
    if (!sheet) return;

    const mappings: ColumnMapping[] = sheet.headers.map(header => ({
      sourceColumn: header,
      targetField: this.autoMapColumn(header),
      required: false,
      mapped: false
    }));

    // Update mapped status
    mappings.forEach(m => {
      const target = this.targetFields.find(f => f.name === m.targetField);
      m.mapped = !!m.targetField;
      m.required = target?.required || false;
    });

    this.columnMappings.set(mappings);
  }

  autoMapColumn(header: string): string {
    const headerLower = header.toLowerCase().replace(/[^a-z]/g, '');
    
    const mappingRules: Record<string, string[]> = {
      'clientCode': ['clientid', 'clientcode', 'id', 'code'],
      'firstName': ['firstname', 'first', 'fname'],
      'lastName': ['lastname', 'last', 'lname', 'surname'],
      'email': ['email', 'mail', 'emailaddress'],
      'phone': ['phone', 'telephone', 'mobile', 'cell'],
      'accountType': ['accounttype', 'account', 'type'],
      'portfolioValue': ['portfoliovalue', 'portfolio', 'value', 'aum'],
      'status': ['status', 'state', 'active']
    };

    for (const [field, keywords] of Object.entries(mappingRules)) {
      if (keywords.some(k => headerLower.includes(k))) {
        return field;
      }
    }
    return '';
  }

  updateMapping(index: number, targetField: string): void {
    const mappings = [...this.columnMappings()];
    mappings[index].targetField = targetField;
    mappings[index].mapped = !!targetField;
    
    const target = this.targetFields.find(f => f.name === targetField);
    mappings[index].required = target?.required || false;
    
    this.columnMappings.set(mappings);
  }

  // Validation
  runValidation(): void {
    this.isValidating.set(true);
    this.validationErrors.set([]);
    this.validationWarnings.set([]);

    setTimeout(() => {
      const errors: ValidationError[] = [];
      const warnings: ValidationError[] = [];

      // Mock validation - in real app, validate actual data
      warnings.push({
        row: 3,
        column: 'Email',
        message: 'Email format may be invalid',
        severity: 'warning'
      });

      this.validationErrors.set(errors);
      this.validationWarnings.set(warnings);
      this.isValidating.set(false);
      this.validationComplete.set(true);
    }, 2000);
  }

  // Upload
  performUpload(): void {
    this.uploadProgress.set(0);
    
    const interval = setInterval(() => {
      const current = this.uploadProgress();
      if (current >= 100) {
        clearInterval(interval);
        this.uploadResults.set({
          total: 5,
          success: 5,
          failed: 0,
          skipped: 0
        });
      } else {
        this.uploadProgress.set(current + 10);
      }
    }, 200);
  }

  // Utilities
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  startNewUpload(): void {
    this.currentStep.set(1);
    this.selectedFile.set(null);
    this.sheets.set([]);
    this.columnMappings.set([]);
    this.validationErrors.set([]);
    this.validationWarnings.set([]);
    this.validationComplete.set(false);
    this.uploadProgress.set(0);
    this.uploadResults.set({ total: 0, success: 0, failed: 0, skipped: 0 });
  }
}