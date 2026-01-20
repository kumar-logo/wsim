export interface ExcelFile {
  id: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: Date;
  processedAt?: Date;
  status: FileStatus;
  sheets: ExcelSheet[];
  mappingConfig?: ColumnMapping[];
  validationResult?: ValidationResult;
  processingLog?: ProcessingLog[];
  errorCount: number;
  warningCount: number;
  recordsProcessed: number;
  recordsTotal: number;
  notes?: string;
}

export interface ExcelSheet {
  name: string;
  index: number;
  rowCount: number;
  columnCount: number;
  headers: string[];
  previewData: any[][];
  selected: boolean;
}

export interface ColumnMapping {
  sourceColumn: string;
  sourceIndex: number;
  targetField: string;
  dataType: DataType;
  required: boolean;
  defaultValue?: any;
  transformation?: string;
  validationRules?: ValidationRule[];
}

export interface ValidationRule {
  type: ValidationType;
  value?: any;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  summary: ValidationSummary;
}

export interface ValidationError {
  row: number;
  column: string;
  value: any;
  message: string;
  severity: 'error';
}

export interface ValidationWarning {
  row: number;
  column: string;
  value: any;
  message: string;
  severity: 'warning';
}

export interface ValidationSummary {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  errorCount: number;
  warningCount: number;
  errorsByColumn: { [column: string]: number };
}

export interface ProcessingLog {
  timestamp: Date;
  action: string;
  details: string;
  status: 'info' | 'success' | 'warning' | 'error';
}

export enum FileStatus {
  UPLOADED = 'uploaded',
  VALIDATING = 'validating',
  VALIDATED = 'validated',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export enum DataType {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
  BOOLEAN = 'boolean',
  CURRENCY = 'currency',
  PERCENTAGE = 'percentage',
  EMAIL = 'email',
  PHONE = 'phone'
}

export enum ValidationType {
  REQUIRED = 'required',
  MIN_LENGTH = 'min_length',
  MAX_LENGTH = 'max_length',
  MIN_VALUE = 'min_value',
  MAX_VALUE = 'max_value',
  PATTERN = 'pattern',
  EMAIL = 'email',
  DATE_FORMAT = 'date_format',
  UNIQUE = 'unique',
  EXISTS = 'exists'
}

export interface UploadConfig {
  allowedTypes: string[];
  maxFileSize: number;
  maxSheets: number;
  maxRows: number;
  targetFields: TargetField[];
}

export interface TargetField {
  name: string;
  displayName: string;
  dataType: DataType;
  required: boolean;
  description?: string;
}

export interface FileUploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  message?: string;
}
