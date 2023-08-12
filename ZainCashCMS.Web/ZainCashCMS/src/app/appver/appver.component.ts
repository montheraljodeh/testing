import { Component, OnInit } from '@angular/core';
import { AppVersionsService } from '../services/app-versions.service';
import { AppVersions, CustomHeader, FormField, Result, SearchModel } from '../models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-appver',
  templateUrl: './appver.component.html',
  styleUrls: ['./appver.component.scss']
})
export class AppverComponent  implements OnInit{

  bannerShows:any;
  options:any=[{label:'12344',value:'7777'},{label:'12344',value:'3322'}]
public coloumnofdata:CustomHeader[]=[{key:'versionNumber',alias:'Version Number',hidden:false},
{key:'buildNumber',alias:'Build Number',hidden:false},
{key:'descreption.arabic',alias:'Arabic',hidden:false},
{key:'descreption.english',alias:'English',hidden:false},
{key:'isDeleted',alias:'isDeleted',hidden:false},


];

public formFields: FormField[] = [
  
  {type:'text',name:'id',label:' Id',required:false,hidden:true,readonly:true},

  {type:'text',name:'requestId',label:'Request Id',required:false,hidden:true},

  {type:'text',name:'versionNumber',label:'Verion Number',required:true,readonly:true},
  {type:'text',name:'buildNumber',label:'Build Number',required:true,readonly:true},

  { type: 'text', name: 'osType',label:'OS Type', required: true,readonly:true },
  {type:'checkbox',name:'isForceUpdate',label:'Is Force Update?',required:true},
  { type: 'textarea', name: 'descreption',label:'Descreption', required: false,readonly:true, subProperties: [{label:'Arabic Description',name:'arabic',readonly:true}, {label:'English',name:'english'}], modelProperty: 'descreption',hidden:true },

];



  totalrecord?:number;

   FormAppVer!:FormGroup
   List?:any[];
   isshowdit:boolean=false;
   singlieobj:any;
   AllData!:AppVersions[];
   singdata!:AppVersions;
   isshow:boolean=false;
   ColoumnName?:string[];
   AppVersions?:AppVersions;
   searchModel?:SearchModel={
    isSort:true,
    sortFiled:"",
    search:"",
    searchField:"",
    requestId:"",
    currentPage:1,  
  } 
  constructor(private appver:AppVersionsService){}
  ngOnInit(): void {

    this.GetAll();
  }
  public GetAll()
  {
  this.AllData=[]
this.appver.GetAll(this.searchModel).subscribe((response:any)=>{
  if(response.succeeded)
  {
    response.data;
    this.AllData=response.data;
    ;
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
    
    this.appver.Create(event).subscribe(response=>{
      this.GetAll();
    })
  }
  public GetSearch(event:any)
  {
    
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
