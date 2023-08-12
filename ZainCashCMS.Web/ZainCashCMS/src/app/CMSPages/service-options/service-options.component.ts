import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { BillerServices, CustomHeader, FormField, SearchModel, ServiceOptions } from 'src/app/models/models';
import { BillerServicesService } from 'src/app/services/biller-service.service';
import { CommonService } from 'src/app/services/common.service';
import { ServiceOptionsService } from 'src/app/services/service-options.service';

@Component({
  selector: 'app-service-options',
  templateUrl: './service-options.component.html',
  styleUrls: ['./service-options.component.scss']
})
export class ServiceOptionsComponent implements OnInit {
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
  public billerServiceList?: SelectItem[] = [];

  public coloumnName: CustomHeader[] = [
    { key: 'name.english', alias: 'Name', hidden: false },
    { key: 'billerServicesRQid', alias: 'Services Options', hidden: false },
    { key: 'identifier', alias: 'Identifier', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false },
  ];

  public formFields: FormField[] = [];

  constructor(private ServiceOptionsService: ServiceOptionsService, private cs: CommonService , 
    private messageService:MessageService, private billerSerivce:BillerServicesService) {

  }
  ngOnInit() {
    this.fillBillerServiceList();
    this.createForm();
    this.getByCriteria();
  }


  createForm(){
    this.formFields = [

      { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
      { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
      { type: 'text', name: 'name', label: 'Name', required: true, subProperties: [{label:'Arabic Name',name:'arabic',readonly:true}, {label:'English Name',name:'english'}]},
      { type: 'text', name: 'identifier', label: 'identifier', required: false, hidden: false,readonly:true },
      { type: 'pDropdown', name: 'billerServicesRQid', required: true, label: 'billervServices', optionsprimeng: this.billerServiceList,readonly:true },
  
  
    ];
  
  }
  onSort(event: any) {
    this.searchModel!.isSort = true;
    this.searchModel!.sortFiled = event.replace(" ", "");
    this.getByCriteria();
  }

  onDelete(event: any) {
    // this.cs.showOrHideSpinner(true);
    // this.ServiceOptionsService.Delete(event).subscribe(respons => {
    //   if (respons) {
    //     this.getByCriteria();
    //     this.cs.showOrHideSpinner(false);
    //     this.cs.pushMessage('success', "Success", "Record Deleted Successfully");
    //   } else {
    //     this.cs.showOrHideSpinner(false);
    //   }
    //   this.cs.showOrHideSpinner(false);
    // })
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
    this.ServiceOptionsService.Create(event).subscribe(response => {
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
    this.ServiceOptionsService.Update(event).subscribe(response => {
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
    this.ServiceOptionsService.GetALL(this.searchModel).subscribe(response => {
      this.cs.showOrHideSpinner(true);
      if (response) {
        this.rows = response.data;
        this.totalrecord = response.total;
        this.isShow = true;
        if (this.billerServiceList && this.rows.length > 0) {
          this.rows.forEach((serviceOptionRows: ServiceOptions) => {

            const matchingItem = this.billerServiceList?.find((billerServiceRows: SelectItem<BillerServices>) => serviceOptionRows.billerServicesRQid === billerServiceRows.value);

            if (matchingItem) {
              serviceOptionRows.billerServicesName = matchingItem.label;
            }
          });
        }
      } else {
        this.rows = [];
      }
      this.cs.showOrHideSpinner(false);
    })

    
  }
  
  fillBillerServiceList() {
    this.billerSerivce.GetSelection().subscribe(response => {
      if (response) {
        
        this.billerServiceList = response;
        this.createForm();
        this.isShow = true;
      } else {
        this.billerServiceList = [];
      }
    })  }

}
