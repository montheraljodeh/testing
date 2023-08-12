import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApplicationClaim, SearchModel } from 'src/app/models/models';
import { ApplicationClaimService } from 'src/app/services/application-claim.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent implements OnInit {
  roleName?: string;
  showSubMenu: boolean = false;
  // visibleMenus: ApplicationClaim[] = [];
  visibleMenus: any[] = [];
  menuItems: MenuItem[] = [];
  isMenuCollapsed: boolean = false;
  language?: string;
  searchModel?: SearchModel = {
    isSort: true,
    sortFiled: "",
    search: "",
    searchField: "",
    requestId: "",
    currentPage: 1,
    pageSize:20
  }
  constructor(private auth: AuthenticationService, private appClaimService: ApplicationClaimService) {
    this.roleName = auth.getLoggedInUser().roleName;
  }

  ngOnInit() {
    // this.menuItems = [
    //   {
    //     title: 'Home',
    //     iconName: 'ti-home-2',
    //     routeLink: 'Home',
    //     subMenuItems: [
    //       { title: 'Home', iconName: 'ti-circle-dotted', routeLink: 'Home' },
    //     ],
    //     showMenuOrHide: true
    //   },
    //   {
    //     title: 'E-Fawateercom',
    //     iconName: 'ti-coin',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'Categories', iconName: 'ti-circle-dotted', routeLink: 'Efawateercom/Categories' },
    //       { title: 'Billers', iconName: 'ti-circle-dotted', routeLink: 'Efawateercom/Billers' },
    //       { title: 'Biller Services', iconName: 'ti-circle-dotted', routeLink: 'Efawateercom/BillerServices' },
    //       { title: 'Services Options', iconName: 'ti-circle-dotted', routeLink: 'Efawateercom/ServiceOptions' }
    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign" || this.roleName == "Marketing"
    //   },
    //   {
    //     title: 'Zain Topup',
    //     iconName: 'ti-coin',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'Zain Topup', iconName: 'ti-circle-dotted', routeLink: 'ZainVouchers' },
    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign" || this.roleName == "Marketing"
    //   },
    //   {
    //     title: 'Digital Vouchers',
    //     iconName: 'ti-play-card',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'Vouchers', iconName: 'ti-circle-dotted', routeLink: 'DigitalVouchers/Vouchers' },
    //       { title: 'Vouchers Categories', iconName: 'ti-circle-dotted', routeLink: 'DigitalVoucher/Categories' },
    //       { title: 'Vouchers Regions', iconName: 'ti-circle-dotted', routeLink: 'DigitalVoucher/Regions' },
    //       { title: 'Vouchers Providers', iconName: 'ti-circle-dotted', routeLink: 'DigitalVoucher/Providers' }
    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign" || this.roleName == "Marketing"
    //   },
    //   {
    //     title: 'Promotions',
    //     iconName: 'ti-gift',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'Promotions', iconName: 'ti-circle-dotted', routeLink: 'Promotions/Promotions' },
    //       { title: 'Promotions Categories', iconName: 'ti-circle-dotted', routeLink: 'Promotions/PromotionCategories' }
    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign" || this.roleName == "Marketing"

    //   },
    //   {
    //     title: 'Donations',
    //     iconName: 'ti-send',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'Donation Services', iconName: 'ti-circle-dotted', routeLink: 'Donation/Services' },
    //       { title: 'Donation Providers', iconName: 'ti-circle-dotted', routeLink: 'Donation/Providers' }
    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign" || this.roleName == "Marketing"

    //   },
    //   {
    //     title: 'Banners',
    //     iconName: 'ti-border-all',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'Banners', iconName: 'text-truncate', routeLink: 'Banners' },
    //       { title: 'Banners ShowIn', iconName: 'text-truncate', routeLink: 'BannerShownIns' }
    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign" || this.roleName == "Marketing"

    //   },
    //   {
    //     title: 'OnBoard',
    //     iconName: 'ti-border-all',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'OnBoard', iconName: 'text-truncate', routeLink: 'OnBoard' },
    //     ],
    //     showMenuOrHide: this.roleName == "Admin"

    //   },

    //   {
    //     title: 'Cards',
    //     iconName: 'ti-credit-card',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'Cards', iconName: 'text-truncate', routeLink: 'Cards' },
    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign" || this.roleName == "Marketing"

    //   },

    //   {
    //     title: 'User suggestion & Feedback',
    //     iconName: 'ti-list',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'User suggestion & Feedback', iconName: 'ti-circle-dotted', routeLink: 'Ticket' },
    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign" || this.roleName == "Marketing"

    //   },
    //   {
    //     title: 'Terms & Conditions',
    //     iconName: 'ti-user-check',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'Terms & Conditions', iconName: 'ti-circle-dotted', routeLink: 'TermsAndConditions' },
    //       { title: 'Terms & Conditions Types', iconName: 'ti-circle-dotted', routeLink: 'TermsAndConditions/Types' }
    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign" || this.roleName == "Compliance"

    //   },
    //   {
    //     title: 'Locations',
    //     iconName: 'ti-map',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'Locations', iconName: 'ti-circle-dotted', routeLink: 'Locations' },
    //       { title: 'Locations Types', iconName: 'ti-circle-dotted', routeLink: 'LocationTypes' }
    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign" || this.roleName == "Compliance"

    //   },
    //   {
    //     title: 'Charge & Limits',
    //     iconName: 'ti-list',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'Charge & Limits', iconName: 'text-truncate', routeLink: 'ChargeLimits' },
    //       { title: 'Charge & Limits Versions', iconName: 'text-truncate', routeLink: 'ChargeLimitsVersions' },

    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign"

    //   },
    //   {
    //     title: 'Get Participants',
    //     iconName: 'ti-list',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'Get Participants', iconName: 'text-truncate', routeLink: 'GetParticipants' },
    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign"

    //   },

    //   {
    //     title: 'User Managment',
    //     iconName: 'ti-settings',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'User Management', iconName: 'text-truncate', routeLink: 'UserManagement' },
    //     ],
    //     showMenuOrHide: this.roleName == "Admin" || this.roleName == "ProductAndDesign"

    //   },

    //   {
    //     title: 'App Versions',
    //     iconName: 'ti-file-text',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'App Versions', iconName: 'text-truncate', routeLink: 'AppVersions' },
    //     ],
    //     showMenuOrHide: this.roleName == "Admin"

    //   },
    //   {
    //     title: 'Custom Notification',
    //     iconName: 'ti-file-text',
    //     routeLink: '',
    //     subMenuItems: [
    //       { title: 'Custom Notification', iconName: 'text-truncate', routeLink: 'CustomNotification' },
    //     ],
    //     showMenuOrHide: this.roleName == "Admin"

    //   },
    // ]
    // this.visibleMenus = this.menuItems.filter(x => x.showMenuOrHide == true)
    const arrows = document.getElementsByClassName("arrow");
    if (arrows) {
      Array.from(arrows).forEach((arrow) => {
        arrow.addEventListener('click', () => {
          arrow.classList.toggle('open');
          const subMenu = arrow.nextElementSibling;

          if (subMenu) {
            // Check if the submenu is currently hidden using ngIf
            const isSubMenuHidden = subMenu.hasAttribute('hidden');

            if (isSubMenuHidden) {
              subMenu.removeAttribute('hidden');
            } else {
              subMenu.setAttribute('hidden', '');
            }
          }
        });
      });
    }
    this.getMenu();
  }


  toggleSubMenu(menuItem: any): void {
    if (menuItem.subMenuItems) {
      menuItem.subMenuVisible = !menuItem.subMenuVisible;
    }
  }

  isMenuItemVisible(menuItem: any): boolean {
    if (menuItem.subMenuItems) {
      return menuItem.subMenuItems.length > 0;
    }
    return true;
  }

  public changelanguage(checklang?: any) {
    console.log(checklang)
    if (checklang == 1) {
      this.language = 'En';
      console.log(true)

      localStorage.setItem('language', checklang.toString());
    }
    else {
      this.language = 'Ar';
      localStorage.setItem('language', checklang!.toString());
    }


  }


  getMenu(){
    // this.appClaimService.GetALL(this.searchModel).subscribe(response=>{
    // if(response){
    //   this.visibleMenus=response.data;
    // }
    // })
    let token: any = this.auth.getToken('token');
      const decoded:any = jwt_decode(token);
      var obj =JSON.parse(decoded.Pages); 
      this.visibleMenus = obj;
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

}
interface MenuItem {
  pageName: string;
  iconName: string;
  routeLink: string;
  subMenuVisible?: boolean;
  subMenuItems?: MenuItem[];
  showMenuOrHide?: boolean;
}




