import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CustomHeader, DigitalVoucherCategories, DigitalVoucherProviders, DigitalVoucherRegions, DigitalVouchers, FormField, SearchModel } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { DigitalVoucherCategoriesService } from 'src/app/services/digital-voucher-categories.service';
import { DigitalVoucherProvidersService } from 'src/app/services/digital-voucher-providers.service';
import { DigitalVoucherRegionsService } from 'src/app/services/digital-voucher-regions.service';
import { DigitalVouchersService } from 'src/app/services/digital-vouchers.service';

@Component({
  selector: 'app-digital-vouchers',
  templateUrl: './digital-vouchers.component.html',
  styleUrls: ['./digital-vouchers.component.scss']
})
export class DigitalVouchersComponent implements OnInit {
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
  voucherCategoriesList: SelectItem[] = [];
  voucherRegionsList: SelectItem[] = [];
  voucherProvidersList: SelectItem[] = [];

  public coloumnName: CustomHeader[] =[]
  public formFields!: FormField[];



  constructor(private digitalVoucherProvidersService: DigitalVoucherProvidersService, private cs: CommonService, private digitalVouchersService:DigitalVouchersService,
    private digitalVoucherCategoriesService: DigitalVoucherCategoriesService, private digitalVoucherRegionsService: DigitalVoucherRegionsService) {

  }
  ngOnInit() {
    this.createForm();
    this.getByCriteria();
    this.fillVoucherCategoriesList();
    this.fillVoucherRegionssList();
    this.fillVoucherProviderList();

  }
createHeader()
{
 this.coloumnName = [
    { key: 'name.english', alias: 'Name', hidden: false },
    { key: 'price', alias: 'Price', hidden: false },
    { key: 'categoryName', alias: 'Categories', hidden: false,key1:'digitalVoucherCategoriesRQid',filldata:this.voucherCategoriesList },
    { key: 'regionName', alias: 'Regions', hidden: false,key1:'digitalVoucherRegionsRQid' ,filldata: this.voucherRegionsList},
    { key: 'providerName', alias: 'Provider', hidden: false,key1:'digitalVoucherProviderRQid' ,filldata:this.voucherProvidersList},
    { key: 'isAvailable', alias: 'Avaliable', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false },
    { key: 'mainImage', alias: 'Image', hidden: false },
    { key: 'logoImage', alias: 'logoImage', hidden: false },
    { key: 'coverImage', alias: 'CoverImage', hidden: false },
    
  ];
}
createForm() {
    this.formFields = [
      { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
      { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
      { type: 'text', name: 'name', label: 'Name', required: true, subProperties: [{label:'Arabic Name',name:'arabic',readonly:true}, {label:'English Name',name:'english',readonly:true}]},
      { type: 'text', name: 'denominationId', label: 'Denomination ID', required: true ,readonly:true},
      { type: 'pDropdown', name: 'digitalVoucherCategoriesRQid', required: true, label: 'Digital Voucher Categories', optionsprimeng: this.voucherCategoriesList ,readonly:true},
      { type: 'pDropdown', name: 'digitalVoucherRegionsRQid', required: true, label: 'Digital Voucher Regions', optionsprimeng: this.voucherRegionsList ,readonly:true },
      { type: 'pDropdown', name: 'digitalVoucherProviderRQid', required: true, label: 'Digital Voucher Providers', optionsprimeng: this.voucherProvidersList ,readonly:true },
      { type: 'text', name: 'description', label: 'Description', required: true, subProperties: [{label:'Arabic Description',name:'arabic',readonly:true}, {label:'English Description',name:'english',readonly:true}]},
      { type: 'file', name: 'mainImage', label: 'Main Image', required: true },
      { type: 'file', name: 'logoImage', label: 'Logo Image', required: true },
      { type: 'file', name: 'coverImage', label: 'Cover Image', required: true },

    ];
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
    this.digitalVouchersService.Update(event).subscribe(response => {
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
    this.digitalVouchersService.GetALL(this.searchModel).subscribe(response => {
      this.cs.showOrHideSpinner(true);
      if (response) {
        this.rows = response.data;
        this.totalrecord = response.total;
        this.isShow = true;
        if (this.rows.length > 0) {
          this.rows.forEach((providersRows: DigitalVouchers) => {
            if (this.voucherCategoriesList) {
              const matchingcCtegory = this.voucherCategoriesList?.find((categoryRows: SelectItem<DigitalVoucherCategories>) => providersRows.digitalVoucherCategoriesRQid === categoryRows.value);
              if (matchingcCtegory) {
                providersRows.categoryName = matchingcCtegory.label;
              }
            }
            if (this.voucherRegionsList) {
              const matchingcRegions = this.voucherRegionsList?.find((regionRows: SelectItem<DigitalVoucherRegions>) => providersRows.digitalVoucherRegionsRQid === regionRows.value);
              if (matchingcRegions) {
                providersRows.regionName = matchingcRegions.label;
              }
            }
            if (this.voucherProvidersList) {
              const matchingcRegions = this.voucherProvidersList?.find((regionRows: SelectItem<DigitalVoucherProviders>) => providersRows.digitalVoucherProviderRQid === regionRows.value);
              if (matchingcRegions) {
                providersRows.providerName = matchingcRegions.label;
              }
            }

          });
        }
      } else {
        this.rows = [];
      }
      this.cs.showOrHideSpinner(false);
    })
  }


  fillVoucherCategoriesList() {
    this.digitalVoucherCategoriesService.GetDigitalVoucherCategoriesList().subscribe(response => {
      if (response) {
        this.voucherCategoriesList = response;
        if (this.voucherCategoriesList)
          this.voucherCategoriesList.unshift({ label: 'Select ...', value: null });
        this.createForm();
        this.createHeader();
        this.isShow = true;
      }

    })
  }

  fillVoucherRegionssList() {
    this.digitalVoucherRegionsService.GetDigitalVoucherRegionsList().subscribe(response => {
      if (response) {
        this.voucherRegionsList = response;
        if (this.voucherRegionsList)
          this.voucherRegionsList.unshift({ label: 'Select ...', value: null });
        this.createForm();
        this.createHeader();
        this.isShow = true;
      }

    })
  }

  fillVoucherProviderList() {
    this.digitalVoucherProvidersService.GetDigitalVoucherProviderList().subscribe(response => {
      if (response) {
        this.voucherProvidersList = response;
        if (this.voucherProvidersList)
          this.voucherProvidersList.unshift({ label: 'Select ...', value: null });
        this.createForm();
        this.createHeader();
        this.isShow = true;
      }

    })
  }
}
