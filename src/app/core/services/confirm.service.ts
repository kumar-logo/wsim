import { Injectable, signal } from '@angular/core';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'danger';
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  private dialogDataSignal = signal<ConfirmDialogData | null>(null);
  private resolveRef: ((value: boolean) => void) | null = null;

  readonly dialogData = this.dialogDataSignal.asReadonly();

  confirm(data: ConfirmDialogData): Promise<boolean> {
    this.dialogDataSignal.set({
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      type: 'info',
      ...data
    });
    return new Promise(resolve => {
      this.resolveRef = resolve;
    });
  }

  accept(): void {
    if (this.resolveRef) {
      this.resolveRef(true);
      this.close();
    }
  }

  reject(): void {
    if (this.resolveRef) {
      this.resolveRef(false);
      this.close();
    }
  }

  private close(): void {
    this.dialogDataSignal.set(null);
    this.resolveRef = null;
  }
}
