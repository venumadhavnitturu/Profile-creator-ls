import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SignUpLoginService} from '../services/signup-login.service';
import {LocalStoreAgeService} from '../services/web-storeage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  existingUser;
  @ViewChild('logUserName', {static: true}) userTextEle: ElementRef;
  constructor(
    private loginService: SignUpLoginService,
    private renderer: Renderer2,
    private localStoreAgeService: LocalStoreAgeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.existingUser = JSON.parse(this.localStoreAgeService.get('loggedInUser'));
    const greet = this.renderer.createText(`Hi!! ${this.existingUser[1].username}`);
    this.renderer.appendChild(this.userTextEle.nativeElement, greet);
  }

  onLogout() {
    this.router.navigate(['/']);
    this.localStoreAgeService.clear('loggedInUser');
  }
}
