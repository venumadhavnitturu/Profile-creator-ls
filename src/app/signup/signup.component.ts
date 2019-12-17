import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SignUpLoginService} from '../services/signup-login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  showContent = false;
  @ViewChild('loginForm', {static: false}) signUpForm: NgForm;

  constructor(private signUpLoginService: SignUpLoginService) { }

  ngOnInit() {
  }

  onSignUp() {
    const user = {profiles: [''], ...this.signUpForm.value};
    console.log(user);
    this.signUpLoginService.signUp(user).subscribe(signUpResponse => {
      console.log(signUpResponse);
    });
    this.signUpForm.reset();
    this.showContent = true;
  }


}
