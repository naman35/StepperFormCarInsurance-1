import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInServiceService {

  constructor() { }

  isSignedIn():boolean
  {
    return true;
  }
}
