import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserLogin } from '../../models/models';
import { ApplicationUsersService } from '../../services/application-users.service';
import jwt_decode from 'jwt-decode';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userLogin: UserLogin = new UserLogin();
  constructor(public fb: FormBuilder, private applicationUsersService: ApplicationUsersService, private cs:CommonService) {
  }

  ngOnInit() {
    localStorage.clear();
    this.createForm();
  }

  login() {
    this.cs.showOrHideSpinner(true);
    this.setModelValues();
    this.applicationUsersService.GetAuthorize(this.userLogin).subscribe(response => {
      if (response.data) {
        this.cs.showOrHideSpinner(false);
        window.localStorage['token'] = response.data;
        const decodedToken: any = jwt_decode(response.data);
        window.localStorage['deviceType'] = decodedToken.DeviceType;
        window.localStorage['roleName'] = decodedToken.Role;
        window.location.href = window.location.origin + '/' + '/admin/Home'
      }
    })
  }

  setModelValues() {
    let formValue = this.loginForm.value;
    this.userLogin.userName = formValue.userName;
    this.userLogin.password = formValue.password;
  }

  createForm() {

    this.loginForm = this.fb.group({
      userName: [''],
      password: ['']

    })


  }



}
