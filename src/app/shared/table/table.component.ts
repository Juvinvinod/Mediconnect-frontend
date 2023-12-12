import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserPopupComponent } from 'src/app/admin/edit-user-popup/edit-user-popup.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> {
  @Output() userDetails = new EventEmitter<T>();
  @Output() blockUser = new EventEmitter<T>();
  @Output() unBlockUser = new EventEmitter<T>();
  @Input() data: T[] = [];
  @Input() columnsConfig: {
    name: string;
    header: string;
    buttons?: { action: string; label: string }[];
  }[] = [];
  @Output() buttonClick = new EventEmitter<{ action: string; data: T }>();

  constructor(private dialog: MatDialog) {}

  // Extract column names from the columnsConfig
  get displayedColumns(): string[] {
    return this.columnsConfig.map((column) => column.name);
  }

  // Method to handle button clicks
  onEdit(element: T) {
    this.userDetails.emit(element);
  }

  onBlock(element: T) {
    this.blockUser.emit(element);
  }

  onUnBlock(element: T) {
    this.unBlockUser.emit(element);
  }

  openPopup() {
    this.dialog.open(EditUserPopupComponent, {
      width: '60%',
      height: '400px',
      data: {
        title: 'User edit'
      }
    });
  }
}
