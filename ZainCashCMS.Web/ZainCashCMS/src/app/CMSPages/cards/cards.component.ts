import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomHeader, FormField, PromotionCategories, SearchModel } from 'src/app/models/models';
import { CardsServiceService } from 'src/app/services/cards-service.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  public coloumnofdata:CustomHeader[]=[{key:'cardType',alias:'Card Type',hidden:false},
  {key:'programId',alias:'ProgramId',hidden:false},
  {key:'textColor',alias:'Text Color',hidden:false},
  {key:'created',alias:'Date',hidden:false},
  {key:'mainImage',alias:'Image',hidden:false},
  {key:'isEnabled',alias:'Status',hidden:false},
  ];
  
  public formFields: FormField[] = [
    
    {type:'text',name:'id',label:' Id',required:false,hidden:true},
    {type:'text',name:'requestId',label:'Request Id',required:false,hidden:true},
    {type:'text',name:'programId',label:'Program Id',required:true},
    {type:'dropdown',name:'cardType',required:true,options:['CardType','CardValue']},
    { type: 'color', name: 'textColor',label:'TextColor', required: true },
    { type: 'color', name: 'textColor',label:'TextColor', required: true },

    {type:'file',name:'mainImage',label:'Main Image',required:true},

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
    constructor(private cards:CardsServiceService){}
    ngOnInit(): void {
  
      this.GetAll();
    }
    public GetAll()
    {
  this.cards.GetAll(this.searchModel).subscribe((response:any)=>{
    if(response.succeeded)
    {
      response.data;
      this.AllData=response.data;
      console.log(this.AllData);
      console.log(response.total)
      this.totalrecord=response.total;
     // this.AllData=response.data;
      this.isshow=true;
    
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
      this.cards.Delete(id).subscribe((response:any)=>{
  
        this.GetAll();
      },(erorr:any)=>{
  this.GetAll();
      })
    }
    onCreate(event:any)
    {
      console.log(event)
      this.cards.Create(event).subscribe(response=>{
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
  this.cards.Update(event).subscribe(response=>{
    this.GetAll();
  })
  }
}
