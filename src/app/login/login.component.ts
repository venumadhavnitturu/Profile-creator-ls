import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {SignUpLoginService} from '../services/signup-login.service';
import {LocalStoreAgeService} from '../services/web-storeage';
import {ProfileCreateService} from '../services/profile-create.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inValidUser = false;
  @ViewChild('loginForm', {static: false}) validateForm: NgForm;
  constructor(
    private router: Router,
    private signUpLoginService: SignUpLoginService,
    private localStoreAgeService: LocalStoreAgeService,
    private profileCreateService: ProfileCreateService
    ) { }
  ngOnInit() {
  }

  userValidate() {
    const loginUser = this.validateForm.value;
    this.signUpLoginService.login()
      .subscribe(
        registeredUsers => {
          console.log(registeredUsers);
          for (let registeredUser in registeredUsers) {
            if (registeredUsers[registeredUser].email === loginUser.username) {
              this.router.navigate(['/home']);
              const successfulLoggedUser = [registeredUser, registeredUsers[registeredUser]];
              this.localStoreAgeService.set('loggedInUser', JSON.stringify(successfulLoggedUser));
            } else {
              this.inValidUser = true;
            }
          }
        }
      )
  }

}
