import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { LocationTypesService } from 'src/app/services/location-types.service';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  public rows?: any
  public locationTypesList?: SelectItem[] = [];
  public isShow: boolean = false;
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
    { key: 'latitude', alias: 'Latitude', hidden: false },
    { key: 'city', alias: 'City', hidden: false },
    { key: 'openHours', alias: 'Open Hours	', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false }
  ];
  public formFields!: FormField[];



  constructor(private locationsService: LocationsService, private locationTypesService: LocationTypesService, private cs: CommonService) {

  }
  ngOnInit() {
    this.fillLocationTypeList();
    this.getByCriteria();

  }

  createForm() {
    this.formFields = [
      { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
      { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
      { type: 'text', name: 'title', label: 'Title', required: true, subProperties: [{label:'Arabic Title',name:'arabic'}, {label:'English Title',name:'english'}] },
      { type: 'text', name: 'longitude', label: 'Longitude', required: true },
      { type: 'text', name: 'latitude', label: 'Latitude', required: true },
      {isgroup:[ 
        { type: 'checkbox', name: 'cashOut', label: 'CashOut', required: false,class:'col-md-3' },
        { type: 'checkbox', name: 'cashIn', label: 'CashIn', required: false,class:'col-md-3' },
        { type: 'checkbox', name: 'registration', label: 'Registration', required: false,class:'col-md-3'}
    ]},

      { type: 'pDropdown', name: 'locationTypeRQid', label: 'Location Type', required: true, optionsprimeng: this.locationTypesList },
      { type: 'text', name: 'city', label: 'City', required: true },
      { type: 'text', name: 'address', label: 'Address', required: true, subProperties: [{label:'Arabic Address',name:'arabic'}, {label:'English Address',name:'english'}]  },
      { type: 'text', name: 'openHours', label: 'Open Hours', required: true },

      { type: 'file', name: 'mainImage', label: 'Main Image', required: true,class:'col-md-12'},

    ];
  }

  onSort(event: any) {
    this.searchModel!.isSort = true;
    this.searchModel!.sortFiled = event.replace(" ", "");
    this.getByCriteria();
  }

  onDelete(event: any) {
    this.cs.showOrHideSpinner(true);
    this.locationsService.Delete(event).subscribe(respons => {
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
    this.locationsService.Create(event).subscribe(response => {
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
    this.locationsService.Update(event).subscribe(response => {
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
    this.locationsService.GetALL(this.searchModel).subscribe(response => {
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

  fillLocationTypeList() {
    this.locationTypesService.GetLocationList().subscribe(response => {
      if (response) {
        this.locationTypesList = response;
        this.locationTypesList?.unshift({ label: "Select ...", value: null })
        this.createForm();
        this.isShow = true;
      }

    })
  }

}
