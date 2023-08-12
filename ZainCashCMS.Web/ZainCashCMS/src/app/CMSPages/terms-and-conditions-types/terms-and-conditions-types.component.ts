import { Component, OnInit } from '@angular/core';
import { CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { TermsAndConditionsTypesService } from 'src/app/services/terms-and-conditions-types.service';

@Component({
  selector: 'app-terms-and-conditions-types',
  templateUrl: './terms-and-conditions-types.component.html',
  styleUrls: ['./terms-and-conditions-types.component.scss']
})
export class TermsAndConditionsTypesComponent implements OnInit {

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
    { key: 'name', alias: 'Name', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false }
  ];

  public formFields: FormField[] = [

    { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
    { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
    { type: 'text', name: 'name', label: 'Name', required: false, hidden: false },
    { type: 'text', name: 'code', label: 'Code', required: false, hidden: false },


  ];

  constructor(private TermsAndConditionsTypesService: TermsAndConditionsTypesService, private cs:CommonService) {

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
    this.TermsAndConditionsTypesService.Delete(event).subscribe(respons => {
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
    this.TermsAndConditionsTypesService.Create(event).subscribe(response => {
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
    this.TermsAndConditionsTypesService.Update(event).subscribe(response => {
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
    this.TermsAndConditionsTypesService.GetALL(this.searchModel).subscribe(response => {
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
