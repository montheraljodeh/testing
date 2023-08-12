import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { PromotionsService } from 'src/app/services/promotions.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
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
    { key: 'address.english', alias: 'Address', hidden: false },
    { key: 'categoryRQid', alias: 'Category', hidden: false },
    { key: 'isPro', alias: 'is Pro', hidden: false },
    { key: 'mobileNumber', alias: 'mobile Number', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false },
  
  ];

  public formFields: FormField[] = [

    { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
    { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
    { type: 'text', name: 'name', label: 'Name', required: true,readonly:false, subProperties: [{label:'Arabic Name',name:'arabic',readonly:false}, {label:'English Name',name:'english',readonly:false}]},
    {type:'checkbox',name:'isInMain',label:"Refluct to main Page ?",required:true,hidden:false},
    {type:'checkbox',name:'isPro',label:"Pro promotion ?",required:true,hidden:false},
    { type: 'text', name: 'description', label: 'Description', required: true, subProperties: [{label:'English Description',name:'english',readonly:false}, {label:'Arabic Description',name:'arabic',readonly:false}]},
    { type: 'text', name: 'address', label: 'Address', required: true, subProperties: [{label:'English Address',name:'english',readonly:false}, {label:'Arabic Address',name:'arabic',readonly:false}]},
    { type: 'text', name: 'discountRate', label: 'Discount Rate', required: true, hidden: false },
    { type: 'text', name: 'mobileNumber', label: 'mobile Number', required: true, hidden: false },
    { type: 'file', name: 'mainImage', label: 'Main Image', required: true },
    { type: 'file', name: 'proImage', label: 'Sub Image', required: true },




  ];

  constructor(private PromotionsService: PromotionsService, private cs: CommonService , private messageService:MessageService) {

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
    this.PromotionsService.Delete(event).subscribe(respons => {
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
    this.PromotionsService.Create(event).subscribe(response => {
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
    this.PromotionsService.Update(event).subscribe(response => {
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
    this.PromotionsService.GetALL(this.searchModel).subscribe(response => {
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
