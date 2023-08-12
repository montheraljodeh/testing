import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs';
import { Result, User } from 'src/app/models/models';
import { RoleManagementService } from 'src/app/services/role-management.service';
import { UserManagementServiceService } from 'src/app/services/user-management-service.service';

@Component({
  selector: 'app-user-management-main',
  templateUrl: './user-management-main.component.html',
  styleUrls: ['./user-management-main.component.scss']
})
export class UserManagementMainComponent implements OnInit {
  @ViewChild('modalPrimary') modalPrimary!: HTMLElement;
  //form
  public UserForm!: FormGroup;
  //show
  public isShowEdit: boolean = false;


  //any
  public DataOfUser?: any[];
  public itemofname: any;
  public uploadedFile!: File;

  model: User = new User();
  public allrole: any = [];

  public allclaims: any[] = [];
  public allcheckclaims: any[] = [];
  constructor(private modalService: NgbModal, private userservice: UserManagementServiceService, private fb: FormBuilder, private role: RoleManagementService) {



  }



  ngOnInit(): void {

    this.createform();
    this.getall();

  }

  getAllRole() {
    this.role.GetAll().subscribe((response: any) => {
      this.allrole = response.data;

    })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.model.file = event.target.files;
      this.model.mainimage = event.target.files[0].name;
    }
  }


  public getall() {
    this.userservice.GetAll().subscribe((response: Result<User>) => {
      if (response.succeeded) {

        this.DataOfUser = response.data;
        console.log(this.DataOfUser)
      }
      this.getAllRole();

    })
  }
  public open(content: any) {
  }
  public getbyid(id: any) {

    this.userservice.GetbyId(id);
  }

  public createform() {

    this.UserForm = this.fb.group({

      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      language: ['0', Validators.required], //
      userEmail: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      roleName: ['', Validators.required],
      aboutDescription: ['', Validators.required],

    });


  }

  public opendialog() {
    //const modalRef: BsModalRef = this.modalService.show(ModalcomponentComponent);

  }

  modalOpenPrimary(content: any) {
    this.isShowEdit = false;
    this.UserForm.reset()
    this.modalService.open(content);

  }
  setModelValues() {
    const formModel = this.UserForm.value;

    this.model.fullName = formModel.fullName;
    this.model.userName = formModel.userName;
    this.model.password = formModel.password;
    this.model.language = formModel.language;
    this.model.userEmail = formModel.userEmail;
    this.model.phoneNumber = formModel.phoneNumber;
    this.model.roleName = formModel.roleName;
    this.model.aboutDescription = formModel.aboutDescription;
  }

  public onSubmit() {
    this.setModelValues()
    this.userservice.CreateUser(this.model).subscribe((response: Result<User>) => {
      if (response.succeeded) {
        this.getall();
      }
    }, (error: any) => {
      this.getall();
    });
  }

  public onClear() {
    this.UserForm.reset();
    this.modalService.dismissAll();

  }
  public onDelete(id: string, fullName: string) {
    this.itemofname = fullName;

    this.userservice.DeleteUser(id).subscribe((response: Result<User>) => {
      if (response.succeeded) {

        this.getall();
      }
    }, (erorr: any) => {
      this.getall();
    })

  }
  public singleuser: any;
  public getroledataclaims: any = [];
  public ShowModalUser(item: any, type1?: any, itemofper?: any) {

    if (type1 == 'perm') {
      this.singleuser = itemofper;
      this.allclaims = [...this.singleuser.claims]
      this.GetRoleBasedOnClaims(itemofper);
      this.modalService.open(item, { size: 'lg' });


    } else {
      this.singleuser = item;
      this.isShowEdit = true;
      this.modalService.open(this.modalPrimary);
      this.UserForm.patchValue({
        fullName: item.fullName,
        userName: item.userName,
        language: item.language,
        userEmail: item.email,
        phoneNumber: item.phoneNumber,
        roleName: item.roleName,
        aboutDescription: item.aboutDescription
      });
    }
  }
  public onUpdate(item: any) {

    this.userservice.UpdateUser(item).subscribe((response: Result<User>) => {

      if (response.succeeded) {

      }
    });
  }
  public GetRoleBasedOnClaims(item: any) {
    this.userservice.GetRoleBasedOnClaims(item.roleName).subscribe((response: any) => {
      if (response.succeeded) {
        this.getroledataclaims = response.data;

      }


    });
  }

  change(event: any, id: any, key: any, operation1: any) {

    const existingItem = this.allclaims.filter(item => item.type == id && item.value == key.toString()).length;

    if (existingItem == 0) {
      this.allclaims.push({ type: id, value: key.toString(), issuer: "" });
      this.allclaims.map(item => {
        if (item.type == id && item.value == key.toString()) {
          item.issuer += operation1;
        }

      })
    } else {
      this.allclaims.map(item => {

        if (item.type == id && item.value == key.toString() && item.issuer.indexOf(operation1) == -1 && event) {
          item.issuer += "," + operation1;
          item.issuer = item.issuer.split(",").sort().join(",");

          return item;
        } else if (item.type == id && item.value == key.toString() && item.issuer.indexOf(operation1) >= 0) {
          item.issuer = item.issuer.replace(operation1 + ',', '');
          item.issuer = item.issuer.replace(operation1, '');

          return item
        }

      });

    }
  }


  updateClaimsBaseUser() {

    console.log(this.allclaims)
    this.allclaims = this.allclaims.filter(item => item.issuer != null);
    let obj = {
      userId: this.singleuser.id,
      claims: this.allclaims
    }
    this.userservice.UpdateClaimsByUser(obj).subscribe((response: any) => {

      if (response.succeeded) {
        this.modalService.dismissAll()
        this.getAllRole();
        this.getall();
        this.allclaims = [];

      }

    });

  }

  checkvalue(id: any, key: any, name: any) {
    if (this.allclaims.filter(item => item.type == id && item.value == key && item.issuer.indexOf(name) !== -1).length == 1) {
      return true;
    } else {
      return false;
    }
  }

}