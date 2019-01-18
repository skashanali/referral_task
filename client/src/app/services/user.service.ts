import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public create(user: User) {
    return this.http.post(`${AppSettings.API_URL}/users/`, user);
  }

  public login(user: User) {
    return this.http.post(`${AppSettings.API_URL}/users/login`, user);
  }
  
  public exists(email: string) {
    return this.http.get(`${AppSettings.API_URL}/users/exists/${email}`);
  }
}
