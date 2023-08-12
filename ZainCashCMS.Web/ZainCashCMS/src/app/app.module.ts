import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ChartModule } from 'primeng/chart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './Core/core.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementMainComponent } from './UserManagement/user-management-main/user-management-main.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RoleManagementComponent } from './RoleManagement/role-management/role-management.component';
import { ZainVouchersComponent } from './CMSPages/zain-vouchers/zain-vouchers.component';
import { UpdateKycComponent } from './CMSPages/update-kyc/update-kyc.component';
import { TransactionsComponent } from './CMSPages/transactions/transactions.component';
import { TicketComponent } from './CMSPages/ticket/ticket.component';
import { TermsAndConditionsTypesComponent } from './CMSPages/terms-and-conditions-types/terms-and-conditions-types.component';
import { TermsAndConditionsComponent } from './CMSPages/terms-and-conditions/terms-and-conditions.component';
import { ServiceOptionsComponent } from './CMSPages/service-options/service-options.component';
import { PromotionsComponent } from './CMSPages/promotions/promotions.component';
import { PromotionCategoriesComponent } from './CMSPages/promotion-categories/promotion-categories.component';
import { NotificationTypesComponent } from './CMSPages/notification-types/notification-types.component';
import { NotificationTopicsComponent } from './CMSPages/notification-topics/notification-topics.component';
import { NotificationsComponent } from './CMSPages/notifications/notifications.component';
import { NotificationNavigatesComponent } from './CMSPages/notification-navigates/notification-navigates.component';
import { MerchantsComponent } from './CMSPages/merchants/merchants.component';
import { LocationTypesComponent } from './CMSPages/location-types/location-types.component';
import { LocationsComponent } from './CMSPages/locations/locations.component';
import { FAQComponent } from './CMSPages/faq/faq.component';
import { DonationServicesComponent } from './CMSPages/donation-services/donation-services.component';
import { DonationProvidersComponent } from './CMSPages/donation-providers/donation-providers.component';
import { DigitalVouchersComponent } from './CMSPages/digital-vouchers/digital-vouchers.component';
import { DigitalVoucherRegionsComponent } from './CMSPages/digital-voucher-regions/digital-voucher-regions.component';
import { DigitalVoucherProvidersComponent } from './CMSPages/digital-voucher-providers/digital-voucher-providers.component';
import { DigitalVoucherCategoriesComponent } from './CMSPages/digital-voucher-categories/digital-voucher-categories.component';
import { ChargeLimitsComponent } from './CMSPages/charge-limits/charge-limits.component';
import { CategoriesComponent } from './CMSPages/categories/categories.component';
import { CardsComponent } from './CMSPages/cards/cards.component';
import { BillerServicesComponent } from './CMSPages/biller-services/biller-services.component';
import { BillersComponent } from './CMSPages/billers/billers.component';
import { BannerShownInsComponent } from './CMSPages/banner-shown-ins/banner-shown-ins.component';
import { DynamictableComponent } from './Shared/dynamictable/dynamictable.component';
import { AppverComponent } from './appver/appver.component';
import { ConfirmMessageComponent } from './Shared/confirm-message/confirm-message.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptorService } from './services/http-config-interceptor.service';
//import { ImageCropperModule } from 'ngx-image-cropper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import{ConfirmDialogModule} from 'primeng/confirmdialog'
import { BannersComponent } from './CMSPages/banners/banners.component';
import {MultiSelectModule} from 'primeng/multiselect';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessagesModule } from 'primeng/messages'; // p-messages component
import { ToastModule } from 'primeng/toast';
import { GetParticipantsComponent } from './CMSPages/get-participants/get-participants.component';
import { HomeComponent } from './CMSPages/home/home.component'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChargeLimitsVersionsComponent } from './CMSPages/charge-limits-versions/charge-limits-versions.component';
import { OnboardComponent } from './CMSPages/onboard/onboard.component';
import { ChargeLimitsHistoryComponent } from './CMSPages/charge-limits-history/charge-limits-history.component';
import {EditorModule} from'primeng/editor';
import { NgxApexchartsModule } from 'ngx-apexcharts'; // Correct import


@NgModule({
  declarations: [
    AppComponent,
    UserManagementMainComponent,
    RoleManagementComponent,
    ZainVouchersComponent,
    UpdateKycComponent,
    TransactionsComponent,
    TicketComponent,
    TermsAndConditionsTypesComponent,
    TermsAndConditionsComponent,
    ServiceOptionsComponent,
    PromotionsComponent,
    PromotionCategoriesComponent,
    NotificationTypesComponent,
    NotificationTopicsComponent,
    NotificationsComponent,
    NotificationNavigatesComponent,
    MerchantsComponent,
    LocationTypesComponent,
    LocationsComponent,
    FAQComponent,
    DonationServicesComponent,
    DonationProvidersComponent,
    DigitalVouchersComponent,
    DigitalVoucherRegionsComponent,
    DigitalVoucherProvidersComponent,
    DigitalVoucherCategoriesComponent,
    ChargeLimitsComponent,
    CategoriesComponent,
    CardsComponent,
    BillerServicesComponent,
    BillersComponent,
    BannerShownInsComponent, 
    DynamictableComponent,
    AppverComponent,
    ConfirmMessageComponent,
    BannersComponent,
    GetParticipantsComponent,
    HomeComponent,
    ChargeLimitsVersionsComponent,
    OnboardComponent,
    ChargeLimitsHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    NgbModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    //ImageCropperModule,
    BrowserAnimationsModule,
    TableModule,
    PaginatorModule,
    ConfirmDialogModule,
    MultiSelectModule,
    ConfirmDialogModule,
    NgxSpinnerModule.forRoot(),
    NgbToastModule,
    MessagesModule,
    ToastModule,
    EditorModule,
    ChartModule,
    NgxApexchartsModule
    
  ],
  providers: [
    ConfirmationService,
    MessageService,
    MessagesModule,
  { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
