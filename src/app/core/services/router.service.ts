import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private currentUrlSubject = new BehaviorSubject<string>('');
  readonly currentUrl$ = this.currentUrlSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).urlAfterRedirects)
    ).subscribe(url => this.currentUrlSubject.next(url));
  }

  navigate(path: string | string[], extras?: any): Promise<boolean> {
    return this.router.navigate(Array.isArray(path) ? path : [path], extras);
  }

  navigateByUrl(url: string): Promise<boolean> {
    return this.router.navigateByUrl(url);
  }

  back(): void {
    window.history.back();
  }
}
