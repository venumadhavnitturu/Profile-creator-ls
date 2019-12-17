import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalStoreAgeService} from '../services/web-storeage';
import {SignUpLoginService} from '../services/signup-login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profiles-table',
  templateUrl: './profiles-table.component.html',
  styleUrls: ['./profiles-table.component.scss']
})
export class ProfilesTableComponent implements OnInit {

  @Output() selectedUser = new EventEmitter();
  // @Output() deleteProfile = new EventEmitter();
  @Input() profiles;
  constructor(
    private localStoreAgeService: LocalStoreAgeService,
    private signUpLoginService: SignUpLoginService,
    private router: Router
  ) { }


  ngOnInit() {
  }

  openDetailView(profile) {
    this.selectedUser.emit(profile);
  }

  onDeleteRow(profile, evt) {
    evt.stopPropagation();
    const loggedInUser = JSON.parse(this.localStoreAgeService.get('loggedInUser'));
    const index = loggedInUser[1].profiles.findIndex(obj => obj.email === profile.email);
    if (index !== -1) {
      loggedInUser[1].profiles.splice(index, 1);
      this.signUpLoginService.createProfile(loggedInUser[0], loggedInUser[1])
        .subscribe(
          profileDeleteRes => {
            for (let user in profileDeleteRes) {
              const latestUser = [user, profileDeleteRes[user]];
              this.localStoreAgeService.set('loggedInUser', JSON.stringify(latestUser));
              // this.deleteProfile.emit();
              this.router.navigate(['/previewProfile']);
            }
          }
        )
    } else {
      alert('Please add profile to delete');
    }
  }
}
