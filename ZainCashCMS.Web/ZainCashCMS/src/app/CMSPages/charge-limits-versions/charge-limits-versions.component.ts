import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { ChargeLimitsHistoryService } from 'src/app/services/charge-limits-history.service';
import { ChargeLimitsVersionsService } from 'src/app/services/charge-limits-versions.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-charge-limits-versions',
  templateUrl: './charge-limits-versions.component.html',
  styleUrls: ['./charge-limits-versions.component.scss']
})
export class ChargeLimitsVersionsComponent implements OnInit {
  public rows?: any
  public isShow: boolean = true;
  totalrecord?: number;
  searchModel?: SearchModel = {
    isSort: true,
    sortFiled: "",
    search: "",
    searchField: "",
    requestId: "",
    currentPage: 0,
  }
  billersList: SelectItem[] = [];
  public formFields!: FormField[]
  public coloumnName: CustomHeader[] = [
    { key: 'version', alias: 'Version', hidden: false },
    { key: 'changeType', alias: 'Change Type', hidden: false },
    { key: 'created', alias: 'Created Date', hidden: false },
    { key: 'createdBy', alias: 'Created By', hidden: false },
  ];

  versionNo?:number;

  constructor(private chargeLimitsVersionsService: ChargeLimitsVersionsService, private cs: CommonService, 
               private router: Router ,private chargeLimitsHistoryService:ChargeLimitsHistoryService) {
  }
  
  ngOnInit() {
    this.createForm()
    this.getByCriteria();
  }

  createForm() {
 
  }

  onSort(event: any) {
    this.searchModel!.isSort = true;
    this.searchModel!.sortFiled = event.replace(" ", "");
    this.getByCriteria();
  }

  onDelete(event: any) {

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

  }

  onEdit(event: any) {
    this.cs.showOrHideSpinner(true);
    this.chargeLimitsVersionsService.Update(event).subscribe(response => {
      if (response) {
        this.getByCriteria();
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage('success', "Success", "Record Updated Successfully");
      } else {
        this.cs.showOrHideSpinner(false);
      }
      this.cs.showOrHideSpinner(false);
    }, err => {
      this.cs.showOrHideSpinner(false);
      this.cs.pushMessage('error', "Error", "Please Make Sure all required felids Filled");

    })
  }
  GetChargeLimitVersion(event:any){
    this.versionNo= event; 
    window.localStorage['chargeLimitVersion'] = this.versionNo;
    window.location.href = window.location.origin + '/' + '/admin/ChargeLimitsHistory'

  }

  getByCriteria() {
    this.chargeLimitsHistoryService.GetVersions(this.searchModel, "", false).subscribe(response => {
      this.cs.showOrHideSpinner(true);
      if (response) {
        this.rows = response.items;
        this.totalrecord = response.totalPages;
        this.isShow = true;
      } else {
        this.rows = [];
      }
      this.cs.showOrHideSpinner(false);
    })

  }
}
