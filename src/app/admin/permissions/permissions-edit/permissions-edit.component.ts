import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permissions-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permissions-edit.component.html',
})
export class PermissionsEditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {}
}
