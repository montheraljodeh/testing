import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CustomHeader, DonationProviders, FormField, SearchModel } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { DonationProvidersService } from 'src/app/services/donation-providers.service';
import { DonationServicesService } from 'src/app/services/donation-services.service';

@Component({
  selector: 'app-donation-providers',
  templateUrl: './donation-providers.component.html',
  styleUrls: ['./donation-providers.component.scss']
})
export class DonationProvidersComponent implements OnInit {
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
  providersList?: any[] = [];
  public coloumnName: CustomHeader[] = [
    { key: 'name.english', alias: 'Name', hidden: false },
    { key: 'description.english', alias: 'Description', hidden: false },
    { key: 'address.english', alias: 'Address', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false }
  ];

  public formFields: FormField[] = [
    { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
    { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
    { type: 'text', name: 'name', label: 'Name', required: true, subProperties: [{label:'Arabic Name',name:'arabic'}, {label:'English Name',name:'english'}]},
    { type: 'text', name: 'description', label: 'Description', required: true, subProperties: [{label:'Arabic Description',name:'arabic'}, {label:'English Description',name:'english'}]},
    { type: 'text', name: 'address', label: 'Address', required: true, subProperties: [{label:'Arabic Address',name:'arabic'}, {label:'English Address',name:'english'}]},
    { type: 'text', name: 'mobileNumber', label: 'Mobile Number', required: false, hidden: false },
    { type: 'color', name: 'providerColor', label: 'Provider Color', required: false },
    { type: 'file', name: 'mainImage', label: 'Main Image', required: true },

  ];

  constructor(private cs: CommonService, private donationProvidersService: DonationProvidersService) {

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
    this.donationProvidersService.Delete(event).subscribe(respons => {
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
    this.donationProvidersService.Create(event).subscribe(response => {
      if (response.length > 0) {
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
    this.donationProvidersService.Update(event).subscribe(response => {
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

    })
  }

  getByCriteria() {
    this.donationProvidersService.GetALL(this.searchModel).subscribe(response => {
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
