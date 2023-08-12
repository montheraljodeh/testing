import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { DigitalVoucherRegionsService } from 'src/app/services/digital-voucher-regions.service';

@Component({
  selector: 'app-digital-voucher-regions',
  templateUrl: './digital-voucher-regions.component.html',
  styleUrls: ['./digital-voucher-regions.component.scss']
})
export class DigitalVoucherRegionsComponent implements OnInit {
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
  categoryList: SelectItem[] = [];
  public coloumnName: CustomHeader[] = [
    { key: 'name.english', alias: 'Name', hidden: false },
    { key: 'code', alias: 'Code', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false }
  ];
  public formFields!: FormField[];



  constructor(private digitalVoucherRegionsService: DigitalVoucherRegionsService, private cs: CommonService) {

  }
  ngOnInit() {
    this.createForm();
    this.getByCriteria();
  }

  createForm() {
    this.formFields = [
      { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
      { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
      { type: 'text', name: 'name', label: 'Name', required: true, subProperties: [{label:'Arabic Name',name:'arabic',readonly:true}, {label:'English Name',name:'english',readonly:true}]},
      { type: 'text', name: 'code', label: 'Code', required: true ,readonly:true },
      { type: 'file', name: 'mainImage', label: 'Main Image', required: true },
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
    this.digitalVoucherRegionsService.Update(event).subscribe(response => {
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
    this.digitalVoucherRegionsService.GetALL(this.searchModel).subscribe(response => {
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
