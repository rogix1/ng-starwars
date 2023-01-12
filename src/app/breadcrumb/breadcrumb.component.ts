import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface BreadcrumbItem {
  label: string;
  link: string | null;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.sass'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
