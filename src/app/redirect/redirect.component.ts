import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  hide: boolean = false;
  username: string = '';
  password: string = '';
  showSpinner: any;
  userNameRequired: boolean = false;
  passwordRequired: boolean = false;
  invalidCredentials: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }

  login() {
    if (this.username == '') {
      this.userNameRequired = true;
    } else if (this.username != '' && this.password == '') {
      this.passwordRequired = true;
      this.userNameRequired = false;
    }
    else if (this.password == '') {
      this.passwordRequired = true;
    } 
    else if (this.username == 'admin' && this.password == 'admin') {
      this.invalidCredentials = false;;
      this.router.navigate(['./viewall']);
    } 
    else {
      this.userNameRequired = false;
      this.passwordRequired = false;
      this.invalidCredentials = true;
    }
  }

  // constructor(private router : Router){
  // }
  // ngOnInit(): void {
  // }

  // createPlan(){
  //   this.router.navigate(['./createplan']);
  // }


  viewPlan() {
    this.router.navigate(['./viewall']);
  }

//   checkUserName(event: any){
// if(this.username != ''){
//   this.userNameRequired = false;
// }
//   }

//   checkUserPassword(event: any){
//     if(this.password != ''){
//       this.passwordRequired = false;
//     }
//   }
}
