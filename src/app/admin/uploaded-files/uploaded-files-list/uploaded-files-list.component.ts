import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-UploadedFilesList',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="page-header">
        <h1 class="page-title">Uploaded Files</h1>
      </div>
      <div class="card p-6">
        <p class="text-slate-500 dark:text-slate-400">Content for Uploaded Files will be displayed here.</p>
      </div>
    </div>
  `
})
export class UploadedFilesListComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {}
}
