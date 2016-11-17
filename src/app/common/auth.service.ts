import { Injectable } from '@angular/core';
import {APP_ENV} from "../app.env";
import {Http} from "@angular/http";
import {contentHeaders} from "./headers";

@Injectable()
export class AuthService {

  constructor(public http: Http) {
  }

  login(email, password) {

    let body = JSON.stringify({ email: email, password: password });
    return this.http.post(APP_ENV.api.auth.path + APP_ENV.api.auth.login, body, { headers: contentHeaders })
        .subscribe(
            response => {
              console.log('res', response.json().token);
              localStorage.setItem('id_token', response.json().token);
            },
            error => {
              alert(error.text());
              console.log(error.text());
            }
        );
  }

}
