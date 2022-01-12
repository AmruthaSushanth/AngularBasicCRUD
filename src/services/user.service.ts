import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:4000/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.url}`);
  }

  addUsers(userData:any) {
    return this.http.post(`${this.url}/add`,userData);
  }

  getById(id:any){
    return this.http.get(`${this.url}/edit/`+ id);
  }

  updateUser(editedData:any,id:any){
    return this.http.post(`${this.url}/update/`+ id, editedData);
  }

  deleteUser(id:any){
    return this.http.get(`${this.url}/delete/`+ id);
  }
}
