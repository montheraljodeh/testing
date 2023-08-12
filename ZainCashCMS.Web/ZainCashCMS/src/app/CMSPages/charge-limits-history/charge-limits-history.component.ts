import { Component, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CustomHeader, FormField, SearchModel } from 'src/app/models/models';
import { ChargeLimitsHistoryService } from 'src/app/services/charge-limits-history.service';
import { ChargeLimitsVersionsService } from 'src/app/services/charge-limits-versions.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-charge-limits-history',
  templateUrl: './charge-limits-history.component.html',
  styleUrls: ['./charge-limits-history.component.scss']
})
export class ChargeLimitsHistoryComponent {
  public rows?: any;
  public rowOfDataForExcel?:any;
  public isShow: boolean = true;
  totalrecord?: number;
  searchModel?: SearchModel = {
    isSort: true,
    sortFiled: "",
    search: "",
    searchField: "",
    requestId: "",
    currentPage: 0,
  }
  billersList: SelectItem[] = [];
  public formFields!: FormField[]
  public coloumnName: CustomHeader[] = [
    { key: 'version', alias: 'Version', hidden: false },
    { key: 'created', alias: 'Created Date', hidden: false },
    { key: 'changeType', alias: 'Change Type', hidden: false },
    { key: 'newType', alias: 'New Type', hidden: false },
    { key: 'newTitle.english', alias: 'New Title', hidden: false },
    { key: 'newLimits', alias: 'New Limits', hidden: false },
    { key: 'newAmount.english', alias: 'New Amount', hidden: false },
    { key: 'newDesc.english', alias: 'New Desc', hidden: false },
    { key: 'newHint.english', alias: 'New Hint', hidden: false },
    { key: 'oldType', alias: 'Old Type', hidden: false },
    { key: 'oldTitle.english', alias: 'Old Title', hidden: false },
    { key: 'oldLimits', alias: 'Old Limits', hidden: false },
    { key: 'oldAmount.english', alias: 'Old Amount', hidden: false },
    { key: 'oldDesc.english', alias: 'Old Desc', hidden: false },
    { key: 'oldHint.english', alias: 'Old Hint', hidden: false },
    { key: 'createdBy', alias: 'Created By', hidden: false },
  ];

 versionNo?:any;
  constructor(private chargeLimitsVersionsService: ChargeLimitsVersionsService, private cs: CommonService, private chargeLimitsHistoryService:ChargeLimitsHistoryService) {
  }
  
  ngOnInit() {
    this.createForm()
    if(localStorage.getItem("chargeLimitVersion")){
      this.versionNo = localStorage.getItem("chargeLimitVersion")
    }
    this.getByCriteria();
  }

  createForm() {
 
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
    this.chargeLimitsVersionsService.Update(event).subscribe(response => {
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

  GetChargeLimitVersion(event:any){
    this.versionNo= event; 
  }

  getByCriteria() {
    this.chargeLimitsHistoryService.GetChargeLimitsByVersionNo(this.searchModel, "", false,this.versionNo).subscribe(response => {
      this.cs.showOrHideSpinner(true);
      if (response) {
        this.rows = response.items;
        this.totalrecord = response.totalPages;
        this.isShow = true;
        this.rowOfDataForExcel=this.preprocessData(this.rows)
      } else {
        this.rows = [];
      }
      this.cs.showOrHideSpinner(false);
    })

  }

  preprocessData(rows: any[]): any[] {
    // return rows.map(row => {
      return rows.map((row, index) => {
        const style = {
          font: { color: { rgb: 'FF0000' } }, // Default font color (black)
        };
    
        if (index > 0 && row.newType == rows[index - 1].oldType) {
          style.font = { color: { rgb: 'FF0000' } }; // Change font color to red
        }
      return {
        // Extract specific properties from the object or transform as needed
        Version:row.version , 
        CreatedDate:row.created, 
        NewType:row.newType, 
        NewTitleEnglish: row.newTitle.english,
        NewTitleArabic: row.newTitle.arabic,
        NewLimits:row.newLimits, 
        NewAmount:row.newAmount.english,
        NewDescriptionEnglish:row.newDesc.english, 
        NewHintEnglish:row.newHint.english,

        OldType:row.newType, 
        OldTitleEnglish: row.newTitle.english,
        OldTitleArabic: row.newTitle.arabic,
        OldLimits:row.newLimits, 
        OldAmount:row.newAmount.english,
        OldDescriptionEnglish:row.newDesc.english, 
        OldDescriptionArabic:row.newDesc.arabic, 
        OldHintEnglish:row.newHint.english,
        OldHintArabic:row.newHint.arabic,
        style
        // ...
      };
    });
  }
}
