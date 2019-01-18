import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {

  constructor(private http: HttpClient) { }

  public generate(data: object) {
    return this.http.post(`${AppSettings.API_URL}/referrals/`, data);
  }

  public check(code: string) {
    return this.http.get(`${AppSettings.API_URL}/referrals/check/${code}`);
  }
  
  public addUserInReferral(code: string, userId: string) {
    return this.http.put(`${AppSettings.API_URL}/referrals/${code}`, { userId }).subscribe(res => console.log(res));
  }
}
