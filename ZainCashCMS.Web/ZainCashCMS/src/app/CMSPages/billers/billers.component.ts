import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Billers, Categories, CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { BillersService } from 'src/app/services/billers.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-billers',
  templateUrl: './billers.component.html',
  styleUrls: ['./billers.component.scss']
})
export class BillersComponent implements OnInit {
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

  public formFields!: FormField[];

  public coloumnName!: CustomHeader[] 

  constructor(private billersService: BillersService, private categoriesService: CategoriesService, private cs: CommonService) {

  }
  ngOnInit() {
    this.fillCategoryList();
    this.getByCriteria();
    this.createForm();
 
  }
createHeader()
{

 this.coloumnName= [
    { key: 'name.english', alias: 'Name', hidden: false },
    { key: 'categoryName', alias: 'Category', hidden: false,filldata:this.categoryList ,key1:'CategoryRQid'},
    { key: 'code', alias: 'Code', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false }
  ];
  console.log(this.categoryList)

}
  createForm() {
    this.formFields = [
      { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
      { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
      { type: 'text', name: 'name', label: 'Name', required: true, subProperties: [{label:'Arabic Name',name:'arabic',readonly:true}, {label:'English Name',name:'english'}]},
      { type: 'text', name: 'code', label: 'Code', required: true },
      { type: 'pDropdown', name: 'categoryRQid', required: true, label: 'Category', optionsprimeng: this.categoryList,readonly:true },
      { type: 'text', name: 'phoneNumber', label: 'PhoneNumber', required: true },
      { type: 'text', name: 'email', label: 'Email', required: true },
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
    this.billersService.Update(event).subscribe(response => {
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
    this.cs.showOrHideSpinner(true);
    this.billersService.GetALL(this.searchModel).subscribe(response => {
      if (response) {
        this.rows = response.data;
        this.totalrecord = response.total;
        this.isShow = true;
        if (this.categoryList && this.rows.length > 0) {
          this.rows.forEach((billerRows: Billers) => {

            const matchingItem = this.categoryList?.find((categoryRows: SelectItem<Categories>) => billerRows.categoryRQid === categoryRows.value);
            console.log(matchingItem)
            if (matchingItem) {
              billerRows.categoryName = matchingItem.label;
            }
          });
        }
      } else {
        this.rows = [];
      }
      this.cs.showOrHideSpinner(false);
    })

  }

  fillCategoryList() {
    this.categoriesService.GetCategoryList().subscribe(response => {
      if (response) {
        this.categoryList = response;
        if (this.categoryList)
          this.categoryList.unshift({ label: 'Select ...', value: null });
            this.createHeader();

          this.createForm();

        this.isShow = true;
      }

    })
  }

}
