import { User } from './../models/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

// const httpOptions = {
//   headers: new HttpHeaders(
//     {
//       'Authorization': 'Bearer ' + localStorage.getItem('token')
//     })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.ApiUrl + 'users/';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    // return this.http.get<User[]>(this.baseUrl, httpOptions);
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + id);
  }

}
