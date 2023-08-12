import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  public rows?: any   
  public isShow: boolean = true;
  totalrecord?: number;
  searchModel?: SearchModel = {
    isSort: true,
    sortFiled: "",
    search: "",
    searchField: "",
    requestId: "",
    currentPage: 1,
  }
  public coloumnName: CustomHeader[] = [
    { key: 'walletNumber', alias: 'Wallet Number', hidden: false },
    { key: 'title', alias: 'Type', hidden: false },
    { key: 'description', alias: 'Description', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false },

  ];

  public formFields: FormField[] = [

    { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
    { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
    { type: 'text', name: 'title', label: 'Title', required: true, hidden: false ,readonly:true},
    { type: 'text', name: 'screenName', label: 'Screen Name', required: true, hidden: false, readonly:true},
    { type: 'text', name: 'description', label: 'Description', required: true, hidden: false, readonly:true},
    { type: 'text', name: 'deviceId', label: 'Device Id', required: true, hidden: false, readonly:true},
    { type: 'text', name: 'deviceType', label: 'Device Type', required: true, hidden: false, readonly:true},
    { type: 'text', name: 'os', label: 'os', required: true, hidden: false },
    { type: 'text', name: 'appVersion', label: 'App Version', required: true, hidden: false, readonly:true},
    { type: 'file', name: 'image', label: 'Main Image', required: true },


  ];

  constructor(private TicketService: TicketService, private cs: CommonService , private messageService:MessageService) {

  }
  ngOnInit() {
    this.getByCriteria();
  }

  onSort(event: any) {
    this.searchModel!.isSort = true;
    this.searchModel!.sortFiled = event.replace(" ", "");
    this.getByCriteria();
  }

  onDelete(event: any) {
    this.cs.showOrHideSpinner(true);
    this.TicketService.Delete(event).subscribe(respons => {
      if (respons) {
        this.getByCriteria();
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage('success', "Success", "Record Deleted Successfully");
      } else {
        this.cs.showOrHideSpinner(false);
      }
      this.cs.showOrHideSpinner(false);
    })
  }

  onSearch(event: any) {
    this.searchModel!.search = event.search;
    this.searchModel!.searchField = event.searchField;
    this.getByCriteria();
  }

  onGetPage(event: any) {
    this.searchModel!.currentPage = event;
    this.getByCriteria();
  }

  onCreate(event: any) {
    this.cs.showOrHideSpinner(true);
    this.TicketService.Create(event).subscribe(response => {
      if (response) {
        this.getByCriteria();
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage('success', "Success", "Record Saved Successfully");
      } else {
        this.cs.showOrHideSpinner(false);
      }
      this.cs.showOrHideSpinner(false);
    })
  }

  onEdit(event: any) {
    this.cs.showOrHideSpinner(true);
    this.TicketService.Update(event).subscribe(response => {
      if (response) {
        this.getByCriteria();
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage('success', "Success", "Record Updated Successfully");
      } else {
        this.cs.showOrHideSpinner(false);
      }
      this.cs.showOrHideSpinner(false);
    })
  }

  getByCriteria() {
    this.TicketService.GetALL(this.searchModel).subscribe(response => {
      this.cs.showOrHideSpinner(true);
      if (response) {
        this.rows = response.data;
        this.totalrecord = response.total;
        this.isShow = true;
      } else {
        this.rows = [];
      }
      this.cs.showOrHideSpinner(false);
    })
  }

}
