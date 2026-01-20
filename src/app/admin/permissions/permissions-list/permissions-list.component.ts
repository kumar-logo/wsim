import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permissions-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permissions-list.component.html',
})
export class PermissionsListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
}