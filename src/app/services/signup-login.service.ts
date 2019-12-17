import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SignUpModel} from '../store/models/signup-model';
import {Profile} from '../store/models/profile-model';

@Injectable({providedIn: 'root'})

export class SignUpLoginService {

  baseUrl = 'https://profile-creator-2b498.firebaseio.com/users.json';
  constructor(private http: HttpClient) {}

  signUp(signUpData: SignUpModel) {
    return this.http.post<{name: string}>(`${this.baseUrl}`, signUpData);
  }

  login() {
    return this
      .http.get(`${this.baseUrl}`);
  }

  createProfile(id: string, profile: Profile) {
    return this.http.patch(`${this.baseUrl}`,{[id]: profile});
  }
}
