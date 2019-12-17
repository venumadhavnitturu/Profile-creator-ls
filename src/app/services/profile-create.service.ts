import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../store/models/profile-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfileCreateService {

  baseUrl = 'https://profile-creator-2b498.firebaseio.com/users.json';

  constructor(private http: HttpClient) {
  }

  createAndStorePosts(form: Profile, id: string): Observable<any> {
    return this.http.put<{name: string}>(`${this.baseUrl}/${id}`, form);
  }

  getUserData(): Observable<any> {
    return this.http.get<Profile>(`${this.baseUrl}`);
  }

  onEdit(userObj) {
    return this.http.put(`${this.baseUrl}`, userObj);
  }
}
