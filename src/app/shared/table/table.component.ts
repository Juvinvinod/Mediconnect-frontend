import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserPopupComponent } from 'src/app/admin/edit-user-popup/edit-user-popup.component';
import { User } from 'src/app/user/interfaces/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Output() userDetails = new EventEmitter<any>();
  @Output() blockUser = new EventEmitter<any>();
  @Output() unBlockUser = new EventEmitter<any>();
  @Input() data: User[] = [];
  @Input() columnsConfig: {
    name: string;
    header: string;
    buttons?: { action: string; label: string }[];
  }[] = [];
  @Output() buttonClick = new EventEmitter<{ action: string; data: User }>();

  constructor(private dialog: MatDialog) {}

  // Extract column names from the columnsConfig
  get displayedColumns(): string[] {
    return this.columnsConfig.map((column) => column.name);
  }

  // Method to handle button clicks
  onEdit(element: User) {
    this.userDetails.emit(element);
  }

  onBlock(element: User) {
    this.blockUser.emit(element);
  }

  onUnBlock(element: User) {
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
