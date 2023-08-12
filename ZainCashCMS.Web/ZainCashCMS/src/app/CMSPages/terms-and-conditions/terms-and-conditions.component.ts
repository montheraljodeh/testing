import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { TermsAndConditionsTypesService } from 'src/app/services/terms-and-conditions-types.service';
import { TermsAndConditionsService } from 'src/app/services/terms-and-conditions.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  public rows?: any;
  public isShow: boolean = false;
  totalrecord?: number;
  public options: SelectItem[] = [];
  selectedOptions = [];

  searchModel?: SearchModel = {
    isSort: true,
    sortFiled: '',
    search: '',
    searchField: '',
    requestId: '',
    currentPage: 1,
  };
  public formFields!: FormField[];

  public coloumnName: CustomHeader[] = [
    { key: 'screenName', alias: 'Name', hidden: false },
    { key: 'isEnabled', alias: 'Title', hidden: false },
    { key: 'type', alias: 'Type', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false },
  ];

  // public formFields: FormField[] = [

  //   { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
  //   { type: 'text', name: 'screenName', label: 'screenName', required: false, hidden: false },
  //   { type: 'dropdown', name: 'type', label: 'type', required: false, hidden: false, },
  //   {type:'checkbox',name:'isUpdated',label:"Do want to notifv all ZainCash Users ?",required:true,hidden:false},
  //   { type: 'text', name: 'name', label: 'Name', required: true, subProperties: ['arabic title', 'english title'], modelProperty: 'TermsAndConditionsService' },

  // ];

  constructor(
    private TermsAndConditionsService: TermsAndConditionsService,
    private termsAndConditionsTypesService: TermsAndConditionsTypesService,
    private cs: CommonService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.fillTermsAndConditionsTypes();
    this.getByCriteria();
  }
  public createform() {
    this.formFields = [
    { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
    { type: 'text', name: 'screenName', label: 'screenName', required: false, hidden: false },
    { type: 'dropdown', name: 'type', label: 'type', required: false, hidden: false, },
    { type: 'text', name: 'title', label: 'title', required: true, subProperties: [{label:'English Title',name:'english'}, {label:'Arabic Title',name:'arabic'}]},
    {type:'checkbox',name:'isUpdated',label:"Do want to notifv all ZainCash Users ?",required:true,hidden:false},

    ];
  }

  onSort(event: any) {
    this.searchModel!.isSort = true;
    this.searchModel!.sortFiled = event.replace(' ', '');
    this.getByCriteria();
  }

  onDelete(event: any) {
    this.cs.showOrHideSpinner(true);
    this.TermsAndConditionsService.Delete(event).subscribe((response) => {
      if (response) {
        this.getByCriteria();
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage(
          'success',
          'Success',
          'Record Deleted Successfully'
        );
      } else {
        this.cs.showOrHideSpinner(false);
      }
      this.cs.showOrHideSpinner(false);
    });
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
    this.TermsAndConditionsService.Create(event).subscribe((response) => {
      if (response) {
        this.getByCriteria();
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage('success', 'Success', 'Record Saved Successfully');
      } else {
        this.cs.showOrHideSpinner(false);
      }
      this.cs.showOrHideSpinner(false);
    });
  }

  onEdit(event: any) {
    this.cs.showOrHideSpinner(true);
    this.TermsAndConditionsService.Update(event).subscribe((response) => {
      if (response) {
        this.getByCriteria();
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage(
          'success',
          'Success',
          'Record Updated Successfully'
        );
      } else {
        this.cs.showOrHideSpinner(false);
      }
      this.cs.showOrHideSpinner(false);
    });
  }

  getByCriteria() {
    this.TermsAndConditionsService.GetALL(this.searchModel).subscribe(
      (response) => {
        this.cs.showOrHideSpinner(true);
        if (response) {
          this.rows = response.data;
          this.totalrecord = response.total;
          this.isShow = true;
        } else {
          this.rows = [];
        }
        this.cs.showOrHideSpinner(false);
      }
    );
  }

  fillTermsAndConditionsTypes() {
    this.termsAndConditionsTypesService.GetSelection().subscribe((response) => {
      if (response) {
        console.log(response);
        this.options = response;
        console.log(response);
        this.createform();
        this.isShow = true;
      } else {
        this.options = [];
      }
    });
  }
}
