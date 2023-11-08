import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/user/interfaces/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() data: User[] = [];
  @Input() columnsConfig: {
    name: string;
    header: string;
    buttons?: { action: string; label: string }[];
  }[] = [];
  @Output() buttonClick = new EventEmitter<{ action: string; data: User }>();

  // Extract column names from the columnsConfig
  get displayedColumns(): string[] {
    return this.columnsConfig.map((column) => column.name);
  }

  // Method to handle button clicks
  onEdit(element: User) {
    // Handle the edit button click for the specified element
    console.log('Edit clicked for user:', element);
  }

  onDelete(element: User) {
    // Handle the delete button click for the specified element
    console.log('Delete clicked for user:', element);
  }
}
