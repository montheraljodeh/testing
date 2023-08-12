import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DashBoardService } from 'src/app/services/dash-board.service';
import * as ApexCharts from 'apexcharts';
import { forkJoin } from 'rxjs';
import { ChartComponent as ApexChartComponent } from 'ngx-apexcharts'; 
import { ChartType } from 'ngx-apexcharts'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  newDevice!: string;
  newRegistration!: string;
  loginUsers!: string;
  deviceLogTotal!: string;
  totalUsers!: string;
  approvedRegistration!: string;
  rejectedRegistration!: string;
  andriodIosDevices!: string;
  ls_Ticket!: string;
  data: any;
  options: any;
  chart1Options: any = {};
  chart2Options: any = {};

  @ViewChild('chart') private chart?: ApexChartComponent; // Use ApexChartComponent
  @ViewChild('lineChart') private lineChart?: ApexChartComponent;

  constructor(private dashBoardService: DashBoardService) {}

  ngOnInit() {
    this.GetAll();
  }

  ngAfterViewInit() {

    this.fetchAndRenderDataChart1();
    this.fetchAndRenderDataChart2();
  }

  fetchAndRenderDataChart1() {
    let char1Data: number[] = [];
    let Char1Date: string[] = [];
    this.dashBoardService.GetLoginPerDay().subscribe(response => {
      if(response){
        char1Data = response.item1;
        Char1Date = response.item2;
        this.buildChart1(char1Data, Char1Date);
      }
    });
}

fetchAndRenderDataChart2() {
  let char2Data: number[] = [];
  let Char2Date: string[] = [];
  this.dashBoardService.GetTicketPerDay().subscribe(response => {
    if(response){
      char2Data = response.item1;
      Char2Date = response.item2;
      this.buildChart2(char2Data, Char2Date);
    }
  });
}

private buildChart1(data: number[], date: string[]): void {
  this.chart1Options = {
    series: [{
      name: 'Inflation',
      data: data
    }],
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val:any) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: date,
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val:any) {
          return val;
        }
      }
    },
    title: {
      text: 'Weekly Inflation in Login flow',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  };
}


private buildChart2(data: number[], date: string[]): void{
  this.chart2Options = {
    series: [{
      name: "Desktops",
      data: data
    }],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Shake & Report',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: date,
    }
  };
}

  GetAll() {
    this.dashBoardService.GetAllTotalDetails().subscribe((response) => {
      if (response) {
        this.newDevice = response.newDevice;
        this.newRegistration = response.newRegistration;
        this.loginUsers = response.loginUsers;
        this.totalUsers = response.totalUsers;
        this.approvedRegistration = response.approvedRegistration;
        this.rejectedRegistration = response.rejectedRegistration;
        this.ls_Ticket = response.ls_Ticket;
        this.andriodIosDevices = response.andriodIosDevices;
      }
    });
  }
}
