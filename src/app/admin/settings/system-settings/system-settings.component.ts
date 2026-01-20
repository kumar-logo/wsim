import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-system-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './system-settings.component.html',
})
export class SystemSettingsComponent implements OnInit {
  settingsForm!: FormGroup;
  isLoading = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  activeTab = signal<string>('general');

  tabs = [
    { id: 'general', label: 'General', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'display', label: 'Display', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'localization', label: 'Localization', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'integrations', label: 'Integrations', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' }
  ];

  timezones = ['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Tokyo', 'Asia/Singapore'];
  currencies = ['USD', 'EUR', 'GBP', 'JPY', 'SGD', 'AUD'];
  dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];
  languages = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'];

  constructor(
    private fb: FormBuilder,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadSettings();
  }

  private initForm(): void {
    this.settingsForm = this.fb.group({
      // General
      companyName: ['Wealth Management Inc.'],
      companyEmail: ['contact@wealthmgmt.com'],
      supportEmail: ['support@wealthmgmt.com'],
      phoneNumber: ['+1 (555) 123-4567'],

      // Display
      theme: ['system'],
      sidebarCollapsed: [false],
      compactMode: [false],
      showAnimations: [true],

      // Localization
      timezone: ['America/New_York'],
      currency: ['USD'],
      dateFormat: ['MM/DD/YYYY'],
      language: ['English'],

      // Integrations
      enableEmailNotifications: [true],
      enableSlackIntegration: [false],
      enableApiAccess: [true],
      apiRateLimit: [1000]
    });
  }

  loadSettings(): void {
    this.isLoading.set(true);
    // Simulate loading
    setTimeout(() => this.isLoading.set(false), 500);
  }

  setActiveTab(tabId: string): void {
    this.activeTab.set(tabId);
  }

  onSubmit(): void {
    this.isSaving.set(true);

    setTimeout(() => {
      this.isSaving.set(false);
      this.toasterService.success('Settings saved successfully!');
    }, 1000);
  }

  resetToDefaults(): void {
    this.initForm();
    this.toasterService.info('Settings reset to defaults');
  }
}