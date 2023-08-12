import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomHeader, FormField, PromotionCategories, SearchModel } from 'src/app/models/models';
import { PromotionCategoriesServiceService } from 'src/app/services/promotion-categories-service.service';

@Component({
  selector: 'app-promotion-categories',
  templateUrl: './promotion-categories.component.html',
  styleUrls: ['./promotion-categories.component.scss']
})
export class PromotionCategoriesComponent {
  public coloumnofdata:CustomHeader[]=[{key:'name.arabic',alias:'Name Arabic',hidden:false},
  {key:'name.english',alias:'Name English',hidden:false},
  {key:'created',alias:'Date',hidden:false},
  {key:'isEnabled',alias:'Status',hidden:false},
  
  ];
  
  public formFields: FormField[] = [
    
    {type:'text',name:'id',label:' Id',required:false,hidden:true},
    {type:'text',name:'requestId',label:'Request Id',required:false,hidden:true},
    { type: 'text', name: 'name',label:'Title', required: true, subProperties: ['arabic', 'english'], modelProperty: 'Title' },

    {type:'file',name:'mainImage',label:'Main Image',required:true},
    {type:'file',name:'proImage',label:'Pro Image',required:true},
    {type:'checkbox',name:'isPro',label:' Is Pro',required:true},

  ];
  
    totalrecord?:number;
  
     FormAppVer!:FormGroup
     List?:any[];
     isshowdit:boolean=false;
     singlieobj:any;
     AllData!:PromotionCategories[];
     singdata!:PromotionCategories;
     isshow:boolean=false;
     ColoumnName?:string[];
     AppVersions?:PromotionCategories;
     searchModel?:SearchModel={
      isSort:true,
      sortFiled:"",
      search:"",
      searchField:"",
      requestId:"",
      currentPage:1,  
    } 
    constructor(private appver:PromotionCategoriesServiceService){}
    ngOnInit(): void {
  
      this.GetAll();
    }
    public GetAll()
    {
  this.appver.GetAll(this.searchModel).subscribe((response:any)=>{
    if(response.succeeded)
    {
      response.data;
      this.AllData=response.data;
      console.log(this.AllData);
      console.log(response.total)
      this.totalrecord=response.total;
     // this.AllData=response.data;
      this.isshow=true;
    
     this.ColoumnName=Object.keys(this.AllData[0]!)
    }
      });
    }
  
    public Sort(event:string)
    {
      this.searchModel!.isSort=true;
      this.searchModel!.sortFiled=event.replace(" ","");
  
  this.GetAll();
    }
    public Delete(id:string)
    {
      console.log(id)
      this.appver.Delete(id).subscribe((response:any)=>{
  
        this.GetAll();
      },(erorr:any)=>{
  this.GetAll();
      })
    }
    onCreate(event:any)
    {
      console.log(event)
      this.appver.Create(event).subscribe(response=>{
        this.GetAll();
      })
    }
    public GetSearch(event:any)
    {
      console.log(event)
      this.searchModel!.search=event.search;
      this.searchModel!.searchField=event.searchField;
      this.GetAll();
    }
  
  public GetPage(event:any)
  {
    this.searchModel!.currentPage=event;
    this.GetAll();
  }
  public onEdit(event:any)
  {
  this.appver.Update(event).subscribe(response=>{
    this.GetAll();
  })
  }
}
