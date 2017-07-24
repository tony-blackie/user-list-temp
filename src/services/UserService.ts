import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private apiURL = 'http://localhost:8000/dinosaurs/?format=json';
  private hostUrl = 'http://localhost:8000';
  private formatQuery = '?format=json';

  constructor(private http: Http) { }

  getDinos() {
    return this.http.get(this.apiURL)
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
  }

  deleteUser(user) {
      console.log(user);
      return this.http.delete(this.hostUrl + '/users/' + user.id)
      .toPromise();
  }

  getUsers() {
      return this.http.get(this.hostUrl + '/users/' + this.formatQuery)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  addNewUser(user) {
      return this.http.post(
          this.hostUrl + '/users/',
          user
      )
      .toPromise();
  }

  updateUser(user) {
      return this.http.put(
          this.hostUrl + '/users/' + user.id + '/',
          user
      )
      .toPromise();
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
