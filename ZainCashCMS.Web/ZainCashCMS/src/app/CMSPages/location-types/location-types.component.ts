import { Component, OnInit } from '@angular/core';
import { CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { LocationTypesService } from 'src/app/services/location-types.service';

@Component({
  selector: 'app-location-types',
  templateUrl: './location-types.component.html',
  styleUrls: ['./location-types.component.scss']
})
export class LocationTypesComponent implements OnInit {
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
    { type: 'text', name: 'name', label: 'Title', required: true, subProperties: [{label:'Arabic Title',name:'arabic'}, {label:'English Title',name:'english'}] },
    { type: 'file', name: 'mainImage', label: 'Main Image', required: true },

  ];

  constructor(private locationTypesService: LocationTypesService, private cs: CommonService) {

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
    this.locationTypesService.Delete(event).subscribe(respons => {
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
    this.locationTypesService.Create(event).subscribe(response => {
      if (response) {
        this.getByCriteria();
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage('success', "Success", "Record Saved Successfully");
      } else {
        this.cs.showOrHideSpinner(false);
      }
      this.cs.showOrHideSpinner(false);
    }, err => {
      this.cs.showOrHideSpinner(false);
      this.cs.pushMessage('error', "Error", "Please Make Sure all required felids Filled");

    })
  }

  onEdit(event: any) {
    this.cs.showOrHideSpinner(true);
    this.locationTypesService.Update(event).subscribe(response => {
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

  getByCriteria() {
    this.locationTypesService.GetALL(this.searchModel).subscribe(response => {
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
