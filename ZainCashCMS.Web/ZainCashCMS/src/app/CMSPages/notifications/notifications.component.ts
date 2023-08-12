import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Languages, Notifications } from 'src/app/models/models';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ApplicationUsersService } from '../../services/application-users.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificationForm!: FormGroup;
  notificationsModel: Notifications = new Notifications();
  languages: Languages = new Languages();

  constructor(private fb: FormBuilder, private notificationsService: NotificationsService) {

  }
  ngOnInit() {
    this.createForm();

  }


  sendNotification() {
    this.setModelValues();
    this.notificationsService.SendNotifications(this.notificationsModel).subscribe(response => {
      if (response) {

      }

    })
  }


  setModelValues() {
    const formCtrl = this.notificationForm.value;
    this.languages.english=formCtrl.title;
    this.languages.arabic=formCtrl.title;
    this.notificationsModel.title =this.languages;
    this.languages =new Languages();
    this.languages.english= formCtrl.message;
    this.notificationsModel.description = this.languages;
    this.notificationsModel.numbers = formCtrl.numbers; 
    this.notificationsModel.mainImage = "";

    this.notificationsModel.topic = "";
    this.notificationsModel.notificationTypesRQid = "";
    this.notificationsModel.notificationTypes = [];
    this.notificationsModel.navigatesToRQid = "";
    this.notificationsModel.notificationNavigates = [];
    this.notificationsModel.sendTo = "";
    this.notificationsModel.screenName = "";
    this.notificationsModel.applicationUserRQId="";
    this.notificationsModel.notificationMessage = new Languages();
    this.notificationsModel.buttonLabel = new Languages();

  }


  createForm() {
    this.notificationForm = this.fb.group({
      numbers: null,
      message: null,
      title: null

    })
  }

}
