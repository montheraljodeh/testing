import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ChargeLimits, ChargeLimitsHistory, CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { ChargeLimitsHistoryService } from 'src/app/services/charge-limits-history.service';
import { ChargeLimitsService } from 'src/app/services/charge-limits.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-charge-limits',
  templateUrl: './charge-limits.component.html',
  styleUrls: ['./charge-limits.component.scss']
})
export class ChargeLimitsComponent implements OnInit {
  public rows?: any
  public typeList?: SelectItem[] = [{ label: "Select ...", value: null },
  { label: "Local Transaction", value: "1" },
  { label: "International Transaction", value: "2" }];

  public limitsPerList?: SelectItem[] = [{ label: "Select ...", value: null },
  { label: "Per Transaction", value: "1" },
  { label: "Per Day", value: "2" },
  { label: "Per Month", value: "3" }];

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
    { key: 'title.english', alias: 'Name', hidden: false },
    { key: 'type', alias: 'Type', hidden: false },
    { key: 'desc.english', alias: 'Decription', hidden: false },
    { key: 'limits', alias: 'Limits', hidden: false },
    { key: 'amount.english', alias: 'Amount', hidden: false },
    { key: 'hint.english', alias: 'Hint', hidden: false },
    { key: 'delete', alias: 'Delete', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false }
  ];
  public formFields!: FormField[];



  constructor(private chargeLimitsService: ChargeLimitsService, private cs: CommonService, private chargeLimitsHistory: ChargeLimitsHistoryService) {

  }
  ngOnInit() {
    this.createForm();
    this.getByCriteria();

  }

  createForm() {
    this.formFields = [
      { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
      { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
      { type: 'text', name: 'title', label: 'Title', required: true, subProperties: [{ label: 'Arabic Title', name: 'arabic', readonly: false }, { label: 'English Title', name: 'english' }] },
      { type: 'pDropdown', name: 'type', label: 'Type', required: true, optionsprimeng: this.typeList },
      { type: 'pDropdown', name: 'limits', label: 'Limits Per', required: true, optionsprimeng: this.limitsPerList },
      { type: 'text', name: 'amount', label: 'Amount', required: true, subProperties: [{ label: 'Arabic Amount', name: 'arabic', readonly: false }, { label: 'English Amount', name: 'english' }] },
      { type: 'textarea', name: 'desc', label: 'Decription', required: true, subProperties: [{ label: 'Arabic Decription', name: 'arabic', readonly: false }, { label: 'English Decription', name: 'english' }] },
      { type: 'textarea', name: 'hint', label: 'Hint', required: true, subProperties: [{ label: 'Arabic Hint', name: 'arabic', readonly: false }, { label: 'English Hint', name: 'english' }] },
    ];
  }

  onSort(event: any) {
    this.searchModel!.isSort = true;
    this.searchModel!.sortFiled = event.replace(" ", "");
    this.getByCriteria();
  }

   async onDelete(event: any) {
    this.cs.showOrHideSpinner(true);
    // const oldChargeLimits =await this.getChargeLimitsById(event.requestId);
    this.chargeLimitsService.GetById(event.requestId).subscribe(oldChargeLimits => {
       this.chargeLimitsService.Delete(event).subscribe(respons => {
        if (respons) {
          this.saveChargeLimistHistory(oldChargeLimits, oldChargeLimits, "Delete");
          this.getByCriteria();
          this.cs.showOrHideSpinner(false);
          this.cs.pushMessage('success', "Success", "Record Deleted Successfully");
        } else {
          this.cs.showOrHideSpinner(false);
        }
        this.cs.showOrHideSpinner(false);
      })
    });
    
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
    this.chargeLimitsService.Create(event).subscribe(response => {
      if (response) {
        this.saveChargeLimistHistory(event, event, "Add");
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

  saveChargeLimistHistory(chargeObj: ChargeLimits, oldData: ChargeLimits, actionType: string) {

    let historyInfo: ChargeLimitsHistory = new ChargeLimitsHistory();
    historyInfo.changeType = '';

    this.chargeLimitsHistory.SaveChargeLimitsHistory(historyInfo, chargeObj, oldData, actionType).subscribe(response => {
      if (response) {

      }

    })
  }
   onEdit(event: any) {
    this.cs.showOrHideSpinner(true);
    this.chargeLimitsService.GetById(event.requestId).subscribe(oldChargeLimits => {
       this.chargeLimitsService.Update(event).subscribe(response => {
        if (response) {
          this.saveChargeLimistHistory(event, oldChargeLimits.data, "Edit");
          this.getByCriteria();
          this.cs.showOrHideSpinner(false);
          this.cs.pushMessage('success', "Success", "Record Updated Successfully");
        } else {
          this.cs.showOrHideSpinner(false);
        }
      }, err => {
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage('error', "Error", err);
  
      })
    });
    // const oldChargeLimits =await this.getChargeLimitsById(event.requestId);

  }

  getByCriteria() {
    this.chargeLimitsService.GetALL(this.searchModel).subscribe(response => {
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

    getChargeLimitsById(id: any): any {
    this.chargeLimitsService.GetById(id).subscribe(response => {
      if (response) {
        return response.data;
      }else{
        return null; 
      }

    })
  }

}
