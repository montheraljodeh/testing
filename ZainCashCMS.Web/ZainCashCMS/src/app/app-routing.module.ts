import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './Core/core.module';
import { UserManagementMainComponent } from './UserManagement/user-management-main/user-management-main.component';
import { RoleManagementComponent } from './RoleManagement/role-management/role-management.component';
import { MasterPageComponent } from './Core/master-page/master-page.component';
import { LoginComponent } from './Core/login/login.component';
import { ZainVouchersComponent } from './CMSPages/zain-vouchers/zain-vouchers.component';
import { TransactionsComponent } from './CMSPages/transactions/transactions.component';
import { UpdateKycComponent } from './CMSPages/update-kyc/update-kyc.component';
import { TicketComponent } from './CMSPages/ticket/ticket.component';
import { TermsAndConditionsTypesComponent } from './CMSPages/terms-and-conditions-types/terms-and-conditions-types.component';
import { TermsAndConditionsComponent } from './CMSPages/terms-and-conditions/terms-and-conditions.component';
import { ServiceOptionsComponent } from './CMSPages/service-options/service-options.component';
import { PromotionsComponent } from './CMSPages/promotions/promotions.component';
import { BannerShownInsComponent } from './CMSPages/banner-shown-ins/banner-shown-ins.component';
import { BillerServicesComponent } from './CMSPages/biller-services/biller-services.component';
import { BillersComponent } from './CMSPages/billers/billers.component';
import { CardsComponent } from './CMSPages/cards/cards.component';
import { CategoriesComponent } from './CMSPages/categories/categories.component';
import { ChargeLimitsComponent } from './CMSPages/charge-limits/charge-limits.component';
import { DigitalVoucherCategoriesComponent } from './CMSPages/digital-voucher-categories/digital-voucher-categories.component';
import { DigitalVoucherProvidersComponent } from './CMSPages/digital-voucher-providers/digital-voucher-providers.component';
import { DigitalVoucherRegionsComponent } from './CMSPages/digital-voucher-regions/digital-voucher-regions.component';
import { DigitalVouchersComponent } from './CMSPages/digital-vouchers/digital-vouchers.component';
import { DonationProvidersComponent } from './CMSPages/donation-providers/donation-providers.component';
import { PromotionCategoriesComponent } from './CMSPages/promotion-categories/promotion-categories.component';
import { FAQComponent } from './CMSPages/faq/faq.component';
import { DonationServicesComponent } from './CMSPages/donation-services/donation-services.component';
import { LocationsComponent } from './CMSPages/locations/locations.component';
import { LocationTypesComponent } from './CMSPages/location-types/location-types.component';
import { MerchantsComponent } from './CMSPages/merchants/merchants.component';
import { NotificationNavigatesComponent } from './CMSPages/notification-navigates/notification-navigates.component';
import { NotificationsComponent } from './CMSPages/notifications/notifications.component';
import { NotificationTopicsComponent } from './CMSPages/notification-topics/notification-topics.component';
import { NotificationTypesComponent } from './CMSPages/notification-types/notification-types.component';
import { AppverComponent } from './appver/appver.component';
import { BannersComponent } from './CMSPages/banners/banners.component';
import { GetParticipantsComponent } from './CMSPages/get-participants/get-participants.component';
import { HomeComponent } from './CMSPages/home/home.component';
import{ChargeLimitsVersionsComponent} from './CMSPages/charge-limits-versions/charge-limits-versions.component'; 
import { OnboardComponent } from './CMSPages/onboard/onboard.component';
import { ChargeLimitsHistory } from './models/models';
import { ChargeLimitsHistoryComponent } from './CMSPages/charge-limits-history/charge-limits-history.component';
const routes: Routes = [

  { path: '', component:LoginComponent },
  
  {path:'admin',component:MasterPageComponent,children:[{path:'RoleManagement',component:RoleManagementComponent},
{path:'UserManagement',component:UserManagementMainComponent},

{path:'ZainVouchers',component:ZainVouchersComponent},
{path:'UpdateKyc',component:UpdateKycComponent},
{path:'Transactions',component:TransactionsComponent},
{path:'Ticket',component:TicketComponent},
{path:'TermsAndConditions/Types',component:TermsAndConditionsTypesComponent},
{path:'TermsAndConditions',component:TermsAndConditionsComponent},
{path:'Efawateercom/ServiceOptions',component:ServiceOptionsComponent},
{path:'Promotions/Promotions',component:PromotionsComponent},
{path:'Promotions/Categories',component:PromotionCategoriesComponent},
{path:'NotificationTypes',component:NotificationTypesComponent},
{path:'NotificationTopics',component:NotificationTopicsComponent},
{path:'CustomNotification',component:NotificationsComponent},
{path:'NotificationNavigates',component:NotificationNavigatesComponent},
{path:'Merchants',component:MerchantsComponent},
{path:'LocationTypes',component:LocationTypesComponent},
{path:'Locations',component:LocationsComponent},
{path:'FAQ',component:FAQComponent},
{path:'Donation/Services',component:DonationServicesComponent},
{path:'Donation/Providers',component:DonationProvidersComponent},
{path:'DigitalVouchers/Vouchers',component:DigitalVouchersComponent},
{path:'DigitalVoucher/Regions',component:DigitalVoucherRegionsComponent},
{path:'DigitalVoucher/Providers',component:DigitalVoucherProvidersComponent},
{path:'DigitalVoucher/Categories',component:DigitalVoucherCategoriesComponent},
{path:'ChargeLimits',component:ChargeLimitsComponent},
{path:'Efawateercom/Categories',component:CategoriesComponent},
{path:'Cards',component:CardsComponent},
{path:'Efawateercom/BillerServices',component:BillerServicesComponent},
{path:'Efawateercom/Billers',component:BillersComponent},
{path:'BannerShownIns',component:BannerShownInsComponent},
{path:'Banners',component:BannersComponent},
{path:'GetParticipants',component:GetParticipantsComponent},
{path:'Home',component:HomeComponent},
{path:'OnBoard',component:OnboardComponent},
{path:'ChargeLimitsVersions',component:ChargeLimitsVersionsComponent},
{
  path:'AppVersions',component:AppverComponent
},
{path:'ChargeLimitsHistory',component:ChargeLimitsHistoryComponent}
],pathMatch: 'prefix'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


