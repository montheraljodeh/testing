import { SelectItem } from "primeng/api";
 
export class UserLogin {
  userName!: string;
  email!: string;
  password!: string;
}



export class User {
  fullName?: string;
  userName?: string;
  password?: string;
  roleName?: string;
  language?: Number;
  userEmail?: string;
  email?: string;
  aboutDescription?: string;
  phoneNumber?: string;
  mainimage?: string;
  file!: File[];
}

export class Result<T>{
  succeeded?: boolean;
  data!: T[];
  msg?: string;
  total?: number
}

export class AppVersions {
  versionNumber?: string | null;
  buildNumber?: string | null;
  oSType?: string | null; // ios , android , huawie
  isForceUpdate?: boolean | null;
  descreption?: string | null;
}
 
export class MWBridge {
  requestObj?: RequestObj
 
}
 
export class RequestObj {
  method?: string;
  aPIName?: string;
  params?: object;
  isEnc?: boolean;
  extras?: Extras;
}
 
export class Extras {
  isUserToken?: boolean;
  isLanguageID?: boolean;
  isPassword?: boolean;
  isPin?: boolean;
  isUserPIN?: boolean;
}
export class SearchModel {
  isSort?: boolean
  sortFiled?: string
  search?: string
  searchField?: string
  requestId?: string
  currentPage?: number
  pageSize?:number
}

export class CustomHeader {
  key?: string;
  alias?: string;
  hidden?: boolean;
  listof?: any;
  type?: string;
  filldata?: any;
  key1?: any;

}

export interface FormField {
  type?: string;
  name?: string;
  required?: boolean;
  options?: any[];
  optionsprimeng?: any;
  subProperties?: any[]; //rember label and name 
  modelProperty?: string;
  label?: string;
  hidden?: boolean;
  readonly?: boolean;
  class?: string;
  isgroup?: any;
}


export class PromotionCategories {
  propImage?: string;
  mainImage?: string;
  isPro?: boolean;
  name?: string;
}

export class Banners {
  title?: Languages;
  isRedirect?: boolean;
  mainImage?: string;
  bannerShownIns?: BannerShownIns[];
  selectorBannerShownIns?: SelectItem;
  categoryRQid?: string;
  promotionCategories?: PromotionCategories[];
  //file!: File[];
  //mage?: Blob;
 

}
 
export class Languages {
  english?: string;
  arabic?: string;

}

export class SelectorBannerShownIns {
  value?: string;

  label?: string
}
 
export class BannerShownIns {
  name?: Languages;
}

export class GetParticipants {
  value?: string;
  desc?: Languages
}
 
export class DonationServices {
  name?: Languages;
  description?: Languages;
  serviceName?: string;
  mainImage?: string;
  providerRQid?: string;
  donationProviders?: DonationProviders[];
  providerName?: string;
}
 
export class DonationProviders {
  name?: Languages;
  description?: Languages
  address?: string;
  MobileNumber?: string;
  mainImage?: string;
  providerColor?: string;
  id?: string;
}
 
export class LocationTypes {
  name?: Languages;
  mainImage?: string
 
}
 
export class Locations {
  title?: Languages
  locationTypeRQid?: string;
  latitude?: string;
  lngitude?: string;
  cashIn?: boolean;
  cashOut?: boolean;
  rgistration?: boolean;
  city?: boolean;
  address?: Languages;
  openHours?: string;
  mainImage?: string;
  locationTypes?: LocationTypes[]
}
export class ExportedLocations {
  title?: string;
  locationType?: string;
  latitude?: string;
  longitude?: string;
  cashIn?: string;
  cashOut?: string;
  registration?: string;
  city?: string;
  address?: string;
  openHours?: string;
}
 
export class ChargeLimits {
  type?: string
  limits?: string;
  title?: Languages;
  desc?: Languages;
  amount?: Languages;
  hint?: Languages;
  hintDate?: Date;
  editDate?: Date;
  typeName?: string;
  limitsName?: string;
}
 
export class Categories {
  name?: Languages;
  code?: string;
  mainImage?: string;
  isServiceUpdate?: Boolean;
  billers?: Billers[];
}
 
export class Billers {
  name?: Languages;
  code?: string;
  categoryRQid?: string;
  email?: string;
  phoneNumber?: string;
  isServiceUpdate?: boolean;
  categories?: Categories[];
  categoryName?: string;//Custome proparty
 
}
 
export class BillerServices {
  billerRQid?: string;
  billers?: Billers[];
  name?: Languages;
  billingNoRequired?: boolean;
  type?: string;
  isServiceUpdate?: boolean;
  serviceType?: string;
  billersName?: string//custome proparty
}
 
export class DigitalVoucherCategories {
  code?: string;
  name?: Languages
  mainImage?: string;
  order?: number;
}
 
export class DigitalVoucherRegions {
  code?: string;
  name?: Languages
  mainImage?: string;
  hasProvider?: boolean;
 
}
 
export class DigitalVoucherProviders {
  code?: string;
  name?: Languages
  mainImage?: string;
  digitalVoucherCategoriesRQid?: string;
  digitalVoucherCategories?: DigitalVoucherCategories[];
  digitalVoucherRegions?: DigitalVoucherRegions[];
  digitalVoucherRegionRQid?: string;
  hasVoucher?: boolean;
  categoryName?: string;
  regionName?: string;
}
 
export class DigitalVouchers {
  description?: Languages;
  name?: Languages;
  isAvailable?: boolean;
  mainImage?: string;
  price?: string;
  logoImage?: string;
  coverImage?: string;
  denominationId?: string;
  digitalVoucherProviderRQid?: string;
  digitalVoucherProviders?: DigitalVoucherProviders;
  digitalVoucherCategoriesRQid?: string;
  digitalVoucherRegionsRQid?: string;
  categoryName?: string;
  regionName?: string;
  providerName?: string;
 
}
 

export class ApplicationlocalStorage{
  roleName?:string;
}



export class ZainVouchers{
  type? :string;

  taxRate? :number;
  
  Amount? :number ;
  
  TaxedAmount? :number; 
}
export class TermsAndConditions{
  
       screenName?:string;
       type?:string;
       title?:Languages;
       description?:Languages;
       isUpdated?:boolean;

}



export class Notifications {
  applicationUserRQId?: string;
  title!: Languages;
  buttonLabel?: Languages;
  description?: Languages;
  notificationMessage?: Languages;
  mainImage?: string;
  isRead?: boolean;
  isSent?: boolean
  topic?: string;
  notificationTypesRQid?: string;
  notificationTypes?: NotificationTypes[]
  navigatesToRQid?: string;
  notificationNavigates?: NotificationNavigates[];
  sendTo?: string;
  screenName?: string;
  numbers?: string;
}


export class NotificationTypes {
  name?: string;
}

export class NotificationNavigates {
  name?: string;
  appPrefix?: string;
}

export class OnBoard {
  pageName?: string;
  description?: string;
  mainImage?: string;
}

export class ChargeLimitsHistory {
  version?: number;
  changeType?: string;
  oldType?: string;
  newType?: string;
  oldLimits?: string;
  newLimits?: string;
  oldTitle?: Languages;
  newTitle?: Languages;
  oldDesc?: Languages;
  newDesc?: Languages;
  oldAmount?: Languages;
  newAmount?: Languages;
  oldHint?: Languages;
  newHint?: Languages;


  //[JsonProperty("oldData")]
  //public ChargeLimits OldData { get; set; }
  //[JsonProperty("NewData")]
  //public ChargeLimits NewData { get; set; }


}


export class ApplicationClaim {
  pageName?: String;
  description?: string;
  subMenuItems?: SubMenuItems[]
  authorizeRole?: string;
  iconName?: string;
  routeLink?: string;
  subMenuVisible?: boolean;

}

export class SubMenuItems {
  pageName?: String;
  iconName?: string;
  routeLink?: string;

}

export class SaveChargeLimitsHistoryDTO
{
    requestObj?:ChargeLimitsHistory;
    chargeObj?:ChargeLimits;
    oldData ?:ChargeLimits
    actionType ?:string; 
}
export class TermsAndConditionsTypes{
  
  
 name?:string;
 code?:string;

  

}
export class Transactions{
  
  userId?: string;
  referenceNumber?: string;
  amount?: string;
  targetWallet?: string;
  status?: string;
  description?: string;
  pos?: string;
  date?: string;

 }

 export class Ticket{
  walletNumber?: string;
  title?: string;
  description?: string;
  screenName?: string;
  image?: string;
  deviceId?: string;
  deviceType?: string;
  os?: string;
  oSVersion?: string;
  appVersion?: string;
 
 }


 export class ServiceOptions{
  
  name?: Languages;
  identifier?: string;
  billerServicesRQid?: string;
  isServiceUpdate?: boolean = false;
  billerServices?: BillerServices[];
  billerServicesName?:string;
 
 }

 export class Promotions {
  id?: string;
  requestId?: string;
  created?: string;
  createdBy?: string;
  lastModified?: string;
  lastModifiedBy?: string;
  isEnabled?: number;
  isDeleted?: number;
  name?: Languages;
  description?:Languages;
  mobileNumber?: string;
  openHours?: string;
  workingHours?: string[];
  workingDays?: string;
  discountRate?: number;
  address?:Languages;
  mainImage?: string;
  extraImage?: string;
  categoryRQid?: string;
  isPro?: boolean;
  isInMain?: boolean;
  promotionCategories?: promotionCategories;
}

export class promotionCategories{
  id?: string;
  requestId?: string;
  created?: string;
  createdBy?: string;
  lastModified?: string;
  lastModifiedBy?: string;
  isEnabled?: number;
  isDeleted?: number;
  name?:Languages;
  mainImage?: string;
  proImage?: string;
  isPro?: boolean;
}

export class FAQ {
  id?: string;
  requestId?: string;
  created?: string;
  createdBy?: string;
  lastModified?: string;
  lastModifiedBy?: string;
  isEnabled?: number;
  isDeleted?: number;
  question?:Languages;
  answer?: Languages;
}



 
