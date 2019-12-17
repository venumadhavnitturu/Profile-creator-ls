import {Component, OnInit} from '@angular/core';
import {ProfileCreateService} from '../services/profile-create.service';
import {Profile} from '../store/models/profile-model';
import {LocalStoreAgeService} from '../services/web-storeage';
import {Router} from '@angular/router';
import {SignUpLoginService} from '../services/signup-login.service';

@Component({
  selector: 'app-preview-profile',
  templateUrl: './preview-profile.component.html',
  styleUrls: ['./preview-profile.component.scss']
})
export class PreviewProfileComponent implements OnInit {

  userInfo: Profile;
  profilesArray = [];
  constructor(
    private profileCreateService: ProfileCreateService,
    private localStoreAgeService: LocalStoreAgeService,
    private signUpLoginService: SignUpLoginService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const loggedInUser = JSON.parse(this.localStoreAgeService.get('loggedInUser'));
    if (loggedInUser[1].profiles.length >= 3) {
      loggedInUser[1].profiles.shift();
      this.profilesArray = loggedInUser[1].profiles;
    } else {
      this.userInfo = loggedInUser[1].profiles.pop();
    }
  }

  onDetailViewOpen(selectedProfile: Profile) {
    this.userInfo = selectedProfile;
  }

  onEdit() {
    this.router.navigate(['/createProfile'], {queryParams: {allowEdit: 'true'}});
    this.localStoreAgeService.set('editUser', JSON.stringify(this.userInfo));
  }
}
