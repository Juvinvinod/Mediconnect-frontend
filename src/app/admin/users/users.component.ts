import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { User } from 'src/app/user/interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  tableData: User[] = [];
  tableColumns: { name: string; header: string }[] = [
    { name: 'index', header: 'SL.No' },
    { name: 'first_name', header: 'First name' },
    { name: 'last_name', header: 'Last name' },
    { name: 'email', header: 'Email' },
    { name: 'mobile', header: 'Mobile' },
    { name: 'actions', header: 'Actions' }
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getUsers().subscribe({
      next: (res: User[]) => {
        this.tableData = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
