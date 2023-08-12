import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CustomHeader, DonationProviders, DonationServices, FormField, SearchModel } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { DonationProvidersService } from 'src/app/services/donation-providers.service';
import { DonationServicesService } from 'src/app/services/donation-services.service';

@Component({
  selector: 'app-donation-services',
  templateUrl: './donation-services.component.html',
  styleUrls: ['./donation-services.component.scss']
})
export class DonationServicesComponent implements OnInit {
  public rows?: any = [];
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
  public providersList?: SelectItem[] = [];
  public coloumnName: CustomHeader[] = [
    { key: 'name.english', alias: 'Name', hidden: false },
    { key: 'serviceName', alias: 'Service Name', hidden: false },
    { key: 'providerName', alias: 'Provider', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false }
  ];
  public formFields!: FormField[];

  constructor(private donationServices: DonationServicesService, private cs: CommonService,
    private donationProvidersService: DonationProvidersService) {

  }
  ngOnInit() {
    this.fillProvidersList();
    this.getByCriteria();
  }

  public createform()
{
   this.formFields = [

    { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
    { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
    { type: 'text', name: 'name', label: 'Name', required: true, subProperties: [{label:'Arabic Name',name:'arabic'}, {label:'English Name',name:'english'}]},
    { type: 'text', name: 'description', label: 'Description', required: true, subProperties: [{label:'Arabic Description',name:'arabic'}, {label:'English Description',name:'english'}] },
    { type: 'text', name: 'serviceName', label: 'Service Name', required: true },
    { type: 'pDropdown', name: 'providerRQid', required: true, label:'Donation Provider', optionsprimeng: this.providersList },
    { type: 'file', name: 'mainImage', label: 'Main Image', required: true },

  ];
  
}


  onSort(event: any) {
    this.searchModel!.isSort = true;
    this.searchModel!.sortFiled = event.replace(" ", "");
    this.getByCriteria();
  }

  onDelete(event: any) {
    this.cs.showOrHideSpinner(true);
    this.donationServices.Delete(event).subscribe(respons => {
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
    this.donationServices.Create(event).subscribe(response => {
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
    this.donationServices.Update(event).subscribe(response => {
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
    this.donationServices.GetALL(this.searchModel).subscribe(response => {
      this.cs.showOrHideSpinner(true);
      if (response) {
        this.rows = response.data;
        this.totalrecord = response.total;
        this.isShow = true;
        if (this.providersList && this.rows.length > 0) {
          this.rows.forEach((serRows: DonationServices) => {

            const matchingItem = this.providersList?.find((provRows: SelectItem<DonationProviders>) => serRows.providerRQid === provRows.value);

            if (matchingItem) {
              serRows.providerName = matchingItem.label;
            }
          });
        }
      } else {
        this.rows = [];
      }
      this.cs.showOrHideSpinner(false);
    })



  }

  fillProvidersList() {
    this.donationProvidersService.GetProvidersList().subscribe(response => {
      if (response) {
        this.providersList = response;
        if(this.providersList)
        this.providersList.unshift({ label: 'Select ...', value: null });
        this.createform();
        this.isShow = true;
      }

    })
  }

}
