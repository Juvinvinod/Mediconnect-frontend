import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { Subscription } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription: Subscription | undefined = undefined;
  staffSubscription: Subscription | undefined = undefined;
  doctorSubscription: Subscription | undefined = undefined;
  chart1Subscription: Subscription | undefined = undefined;
  chart2Subscription: Subscription | undefined = undefined;

  apiData1: { _id: string; doctorName: string; totalBookings: number }[] = [];
  apiData2: { _id: string; dept: string; totalBookings: number }[] = [];
  labels1: string[] = [];
  data1: number[] = [];
  labels2: string[] = [];
  data2: number[] = [];
  userCount = {};
  docCount = {};
  staffCount = {};

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.userSubscription = this.adminService.getCount('user').subscribe({
      next: (res) => {
        this.userCount = res;
      }
    });
    this.staffSubscription = this.adminService.getCount('staff').subscribe({
      next: (res) => {
        this.staffCount = res;
      }
    });
    this.doctorSubscription = this.adminService.getCount('doctor').subscribe({
      next: (res) => {
        this.docCount = res;
      }
    });
    this.fetchChart1Data();
    this.fetchChart2Data();
  }

  fetchChart1Data() {
    this.chart1Subscription = this.adminService.getBookedSlotDocs().subscribe({
      next: (res) => {
        this.apiData1 = res;
        for (let i = 0; i < this.apiData1.length; i++) {
          this.labels1.push(this.apiData1[i].doctorName);
          this.data1.push(this.apiData1[i].totalBookings);
        }
        this.renderChart1();
      }
    });
  }

  fetchChart2Data() {
    this.chart2Subscription = this.adminService.PatientsPerDept().subscribe({
      next: (res) => {
        this.apiData2 = res;
        for (let i = 0; i < this.apiData2.length; i++) {
          this.labels2.push(this.apiData2[i].dept);
          this.data2.push(this.apiData2[i].totalBookings);
        }
        this.renderChart2();
      }
    });
  }

  renderChart1() {
    new Chart('piechart1', {
      type: 'bar',
      data: {
        labels: [...this.labels1],
        datasets: [
          {
            label: 'Number of patients',
            data: [...this.data1],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderChart2() {
    new Chart('piechart2', {
      type: 'bar',
      data: {
        labels: [...this.labels2],
        datasets: [
          {
            label: 'Number of patients',
            data: [...this.data2],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.doctorSubscription) {
      this.doctorSubscription.unsubscribe();
    }

    if (this.staffSubscription) {
      this.staffSubscription.unsubscribe();
    }

    if (this.chart1Subscription) {
      this.chart1Subscription.unsubscribe();
    }

    if (this.chart2Subscription) {
      this.chart2Subscription.unsubscribe();
    }
  }
}
