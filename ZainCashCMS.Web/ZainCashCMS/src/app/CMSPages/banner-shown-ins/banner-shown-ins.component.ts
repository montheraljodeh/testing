import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { BannerShownInsService } from 'src/app/services/banner-shown-ins.service';
import { CommonService, MessageType } from 'src/app/services/common.service';

@Component({
  selector: 'app-banner-shown-ins',
  templateUrl: './banner-shown-ins.component.html',
  styleUrls: ['./banner-shown-ins.component.scss']
})
export class BannerShownInsComponent implements OnInit {
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
    { key: 'name.english', alias: 'Name', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false }
  ];

  public formFields: FormField[] = [

    { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
    { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
    { type: 'text', name: 'name', label: 'Name', required: true, subProperties: [{label:'Arabic Name',name:'arabic',readonly:true}, {label:'English Name',name:'english'}] , modelProperty: 'bannerShownIns' },
  ];

  constructor(private bannerShownInsService: BannerShownInsService, private cs: CommonService , private messageService:MessageService) {

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
    this.bannerShownInsService.Delete(event).subscribe(respons => {
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
    this.bannerShownInsService.Create(event).subscribe(response => {
      if (response) {
        this.getByCriteria();
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage('success', "Success", "Record Saved Successfully");
      } else {
        this.cs.showOrHideSpinner(false);
      }
    }, err => {
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage('error', "Error", err);
      })
  }

  onEdit(event: any) {
    this.cs.showOrHideSpinner(true);
    this.bannerShownInsService.Update(event).subscribe(response => {
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
    this.cs.showOrHideSpinner(true);
    this.bannerShownInsService.GetALL(this.searchModel).subscribe(response => {
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
