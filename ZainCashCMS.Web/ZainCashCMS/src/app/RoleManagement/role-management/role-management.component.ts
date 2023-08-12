import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Result } from 'src/app/models/models';
import { RoleManagementService } from 'src/app/services/role-management.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  public DataofRole?: any[];
  public RoleForm!: FormGroup;
  public DataofClaim?: any[];
  public objofrole?: any;
  constructor(private modalService: NgbModal, private roleservice: RoleManagementService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.getall();
    this.CreateForm();
    this.getallwithpages();
  }
  public CreateForm() {
    this.RoleForm = this.fb.group({
      name: ''
    })
  }
  public getall() {
    this.roleservice.GetAll().subscribe((response: Result<any>) => {
      if (response.succeeded) {
        this.DataofRole = response.data;
      }

    }, (error: any) => {
      console.log(true);
    })

  }
  public onsubmit() {
    this.roleservice.CreateRole(this.RoleForm.value).subscribe((response: Result<any>) => {

      if (response.succeeded) {
        console.log(response.msg);
        this.getall();
        this.RoleForm.reset();
        this.modalService.dismissAll();
      }
    });
  }

  modalOpenPrimary(content: any, item: any = null) {

    if (item != null) {
      this.objofrole = item;

    }

    this.modalService.open(content);

  }


  change(event: any, id: any) {


    if (event == true) {
      let item = this.DataofClaim?.find(x => x.id == id);
      if (item) {
        let x = 1;
        this.objofrole.claims.push({ type: id, value: x.toString(), issuers: "local autherizty" })
        console.log(this.objofrole)

      } else {

      }



    } else {
      this.objofrole.claims = this.objofrole.claims.filter((item: any) => item.type !== id);
      console.log(this.objofrole.claims)

    }

  }

  public checkvalue(id: any) {
    if (this.objofrole.claims.filter((item: any) => item.type === id).length == 1) {
      return true;
    } else {
      return false;
    }


  }

  updatewithpage() {
    this.roleservice.updateWithClaims(this.objofrole).subscribe((response: any) => {

      console.log(response)
      this.getall();
      this.getallwithpages();
      this.modalService.dismissAll();
    })

  }
  getallwithpages() {


    this.roleservice.GetAllWithPages().subscribe((response: any) => {
      this.DataofClaim = response.data;
      console.log(this.DataofClaim)
    })
  }

}


