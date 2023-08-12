import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/api';
import { Banners, CustomHeader, FormField, Languages, SearchModel } from 'src/app/models/models';
import { BannerShownInsService } from '../../services/banner-shown-ins.service';
import { BannersService } from 'src/app/services/banners.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']

})
export class BannersComponent implements OnInit {
  bannersForm!: FormGroup;
  public isshowdit?: boolean = false;
  public singlieobj: any;

  public rows?: any
  public isshow: boolean = false;
  bannerShows?: any[];
  public options: SelectItem[] = []
  bannersModel: Banners = new Banners();
  languages: Languages = new Languages();
  selectedOptions = [];

  file: any
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
    { key: 'isRedirect', alias: 'Is Redirect', hidden: false },
    { key: 'created', alias: 'Date', hidden: false },
    { key: 'isEnabled', alias: 'Status', hidden: false },
    { key: 'isDeleted', alias: 'Delete', hidden: false },
    {key:'mainImage',alias:'Image',hidden:false}

  ];



  constructor(private modal: NgbModal, private fb: FormBuilder, private bannerShownInsServiceService: BannerShownInsService,
    private bannersService: BannersService, private cs: CommonService) {

  }

  ngOnInit() {
    this.createform();
    this.getByCriteria();
    this.fillBannerShowsIn();

    console.log(this.formFields)

  }
  public formFields!: FormField[]
  public createform() {
    this.formFields = [
      { type: 'text', name: 'id', label: ' Id', required: false, hidden: true },
      { type: 'text', name: 'requestId', label: 'Request Id', required: false, hidden: true },
      { type: 'textarea', name: 'title', label: 'Descreption', required: false, subProperties: [{label:'Arabic Descreption',name:'arabic'}, {label:'English Descreption',name:'english'}] },
      { type: 'multidropdown', name: 'selectorBannerShownIns', label: 'Banner Shows In', required: true, optionsprimeng: this.options },
      { type: 'checkbox', name: 'isRedirect', label: 'Is Redirect?', required: false },
      { type: 'file', name: 'mainImage', label: 'Main Image', required: true },
    ];

  }

  onGetPage(event: any) {
    this.searchModel!.currentPage = event;
    this.getByCriteria();
  }


  public open(content: any) {
    this.modal.open(content);

  }

  onSearch(event: any) {
    this.searchModel!.search = event.search;
    this.searchModel!.searchField = event.searchField;
    this.getByCriteria();
  }

  onCreate(event: any) {
    this.cs.showOrHideSpinner(true);
    this.bannersService.Post(event).subscribe(response => {
      if (response) {
        this.getByCriteria();
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage('success', "Success", "Record Saved Successfully");
      } else {
        this.cs.showOrHideSpinner(false);
      }
    }
    , err => {
      this.cs.showOrHideSpinner(false);
      this.cs.pushMessage('error', "Error", err);
    })
    
  }

  getByCriteria() {
    this.cs.showOrHideSpinner(true); 
    this.bannersService.GetALL(this.searchModel).subscribe(response => {

      if (response) {
        this.rows = response.data;
        this.totalrecord = response.total;
      } else {
        this.rows = [];
      }
      this.cs.showOrHideSpinner(false);
    })
  }

  onEdit(event: any) {
    this.cs.showOrHideSpinner(true);
    this.bannersService.Update(event).subscribe(response => {
      if (response) {
        this.getByCriteria();
        this.cs.showOrHideSpinner(false);
        this.cs.pushMessage('success', "Success", "Record Updated Successfully");
      } else {
        this.cs.showOrHideSpinner(false);
      }
    }, err => {
      this.cs.showOrHideSpinner(false);
      this.cs.pushMessage('error', "Error", err);
    })
  }

  onDelete(event: any) {
    this.cs.showOrHideSpinner(true);
    this.bannersService.Delete(event).subscribe(respons => {
      if (respons) {
        this.getByCriteria();
        this.cs.pushMessage('success', "Success", "Record Deleted Successfully");
      }
    })
    this.cs.showOrHideSpinner(false);
  }

  onSort(event: any) {
    this.searchModel!.isSort = true;
    this.searchModel!.sortFiled = event.replace(" ", "");
    this.getByCriteria();
  }

  onSubmit() {
    if (this.isshowdit == true) {
      this.bannersService.Update(this.bannersModel).subscribe(response => {
        if (response) {
          this.getByCriteria();
          //this.cs.downloadImage(this.file); 
        }
      })
    } else {
      this.bannersService.Post(this.bannersModel).subscribe(response => {
        if (response) {
          this.getByCriteria();
        }

      })
    }

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      //this.bannersModel.file = event.target.files;
      this.file = event.target.files;
      this.bannersModel.mainImage = event.target.files[0].name;

    }
  }

  fillBannerShowsIn() {
    this.bannerShownInsServiceService.GetSelection().subscribe(response => {
      if (response) {
        console.log(response)
        this.options = response;
        console.log(response)
        this.createform();
        this.isshow = true;
      } else {
        this.options = [];
      }
    })
  }
}




