import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {contentHeaders} from "../../common/headers";

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(public router: Router, public http: Http, fb:FormBuilder) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
      let body = JSON.stringify({ username: this.email.value, password: this.password.value });
      this.http.post('http://localhost:3001/sessions/create', body, { headers: contentHeaders })
          .subscribe(
              response => {
                localStorage.setItem('id_token', response.json().id_token);
                this.router.navigate(['home']);
              },
              error => {
                alert(error.text());
                console.log(error.text());
              }
          );
    }
  }

}
