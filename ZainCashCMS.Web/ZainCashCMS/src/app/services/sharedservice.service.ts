import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {

  constructor() { }



  public CheckCapitalLetterAndSpace(inputString:string):String
  {

const formattedString = inputString.replace(/([a-z])([A-Z])|([A-Z])([A-Z][a-z]+)/g, (_match, p1, p2, p3, p4):any => {
  if (p1 && p2) {
    return p1.toUpperCase() + ' ' + p2;
  } else if (p3 && p4) {
    return p3 + ' ' + p4.charAt(0).toUpperCase() + p4.slice(1);
  }
});

console.log(formattedString); // Output: Description

return formattedString;
  }
}
