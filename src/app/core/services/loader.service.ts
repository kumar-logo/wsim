import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingSignal = signal<boolean>(false);
  private loadingTextSignal = signal<string>('Loading...');
  private requestCount = 0;

  readonly isLoading = this.loadingSignal.asReadonly();
  readonly loadingText = this.loadingTextSignal.asReadonly();

  show(text: string = 'Loading...'): void {
    this.requestCount++;
    this.loadingTextSignal.set(text);
    this.loadingSignal.set(true);
  }

  hide(): void {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.loadingSignal.set(false);
    }
  }

  forceHide(): void {
    this.requestCount = 0;
    this.loadingSignal.set(false);
  }
}
