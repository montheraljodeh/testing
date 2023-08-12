import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BillerServices, Billers, CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { BillerServicesService } from 'src/app/services/biller-service.service';
import { BillersService } from 'src/app/services/billers.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-biller-services',
  templateUrl: './biller-services.component.html',
  styleUrls: ['./biller-services.component.scss']
})
export class BillerServicesComponent implements OnInit {
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
  billersList: SelectItem[] = [];
  public coloumnName: CustomHeader[]=[]
  public formFields!: FormField[]



  constructor(private billers: BillersService, private billerServices: BillerServicesService, private cs: CommonService) {
  }
  
  ngOnInit() {
    this.createForm()
    this.fillBillersList();
    this.getByCriteria();
  }

  createForm() {
    this.formFields = [
      { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
      { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
      { type: 'text', name: 'name', label: 'Name', required: true, subProperties: [{label:'Arabic Name',name:'arabic',readonly:true}, {label:'English Name',name:'english'}]},
      { type: 'text', name: 'serviceType', label: 'Service Type', required: true },
      { type: 'pDropdown', name: 'billerRQid', required: true, label: 'Biller', optionsprimeng: this.billersList,readonly:true },
    ];
  }
createHeader()
{
  this.coloumnName= [
    { key: 'name.english', alias: 'Name', hidden: false },
    { key: 'billersName', alias: 'Biller', hidden: false ,key1:'billerRQid',filldata:this.billersList},
    { key: 'serviceType', alias: 'Services Type', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false }
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
    this.billerServices.Update(event).subscribe(response => {
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
    this.billerServices.GetALL(this.searchModel).subscribe(response => {
      if (response) {
        this.rows = response.data;
        this.totalrecord = response.total;
        this.isShow = true;
        if (this.billersList && this.rows.length > 0) {
          this.rows.forEach((billerServiceRows: BillerServices) => {

            const matchingItem = this.billersList?.find((billersServRows: SelectItem<Billers>) => billerServiceRows.billerRQid === billersServRows.value);

            if (matchingItem) {
              billerServiceRows.billersName = matchingItem.label;
            }
          });
        }
      } else {
        this.rows = [];
      }
      this.cs.showOrHideSpinner(false);
    })

  }

  fillBillersList() {
    this.billers.GetBillersList().subscribe(response => {
      if (response) {
        this.billersList = response;
        if (this.billersList)
          this.billersList.unshift({ label: 'Select ...', value: null });
        this.createForm();
        this.createHeader();
        this.isShow = true;
      }

    })
  }

}
