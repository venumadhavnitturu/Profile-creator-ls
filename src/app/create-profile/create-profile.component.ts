import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileCreateService} from '../services/profile-create.service';
import {ActivatedRoute} from '@angular/router';
import {LocalStoreAgeService} from '../services/web-storeage';
import {SignUpLoginService} from '../services/signup-login.service';
import {Profile} from '../store/models/profile-model';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  userForm: FormGroup;
  fileName: string;
  convertedImage: any;
  updateBtn = false;
  editUserData: Profile;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private localStoreAgeService: LocalStoreAgeService,
    private signUpLoginService: SignUpLoginService
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobile: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      experience: new FormControl(null, Validators.required),
      currentOrg: new FormControl(null, Validators.required),
      skills: new FormControl(null, Validators.required),
      profilePic: new FormControl('')
    });

    this.route.queryParams.subscribe(params => {
      if (params.allowEdit === 'true') {
        this.updateBtn = true;
        this.editUserData = JSON.parse(this.localStoreAgeService.get('editUser'));
        console.log(this.editUserData);
        this.userForm.setValue({
          firstName: this.editUserData.firstName,
          lastName: this.editUserData.lastName,
          email: this.editUserData.email,
          mobile: this.editUserData.mobile,
          designation: this.editUserData.designation,
          experience: this.editUserData.experience,
          currentOrg: this.editUserData.currentOrg,
          skills: this.editUserData.skills,
          profilePic: this.editUserData.profilePic ? this.editUserData.profilePic : null,
        });
      }
    });
  }

  onAddPhoto(event) {
    const reader = new FileReader();

    this.fileName = event.target.files[0].name;

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.convertedImage = reader.result;
        this.userForm.patchValue({
          file: reader.result
        });
      };
    }
  }
  onSubmit() {
    const loggedInUser = JSON.parse(this.localStoreAgeService.get('loggedInUser'));
    console.log(loggedInUser);
    const profileForm = {...this.userForm.value, profilePic: this.convertedImage};
    loggedInUser[1].profiles.push(profileForm);
    this.signUpLoginService.createProfile(loggedInUser[0], loggedInUser[1])
      .subscribe(
        profileSubmitRes => {
          for (let user in profileSubmitRes) {
            const latestUser = [user, profileSubmitRes[user]];
            this.localStoreAgeService.set('loggedInUser', JSON.stringify(latestUser));
          }
        }
      );
    this.userForm.reset();
    this.fileName = null;
  }

  onUpdate() {
    const loggedInUser = JSON.parse(this.localStoreAgeService.get('loggedInUser'));
    const index = loggedInUser[1].profiles.findIndex(obj => obj.email === this.userForm.value.email);
    const updateForm = {...this.userForm.value, profilePic: this.convertedImage};
    loggedInUser[1].profiles[index] = updateForm;
    this.signUpLoginService.createProfile(loggedInUser[0], loggedInUser[1])
      .subscribe(updateProfileRes => {
        for (let user in updateProfileRes) {
          const latestUser = [user, updateProfileRes[user]];
          this.localStoreAgeService.set('loggedInUser', JSON.stringify(latestUser));
        }
      });
    this.userForm.reset();
    this.fileName = null;
  }

}

