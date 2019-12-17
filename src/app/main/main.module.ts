import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {CreateProfileComponent} from '../create-profile/create-profile.component';
import {PreviewProfileComponent} from '../preview-profile/preview-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {BrowserModule} from '@angular/platform-browser';
import {HomeComponent} from '../home/home.compoent';
import {ProfilesTableComponent} from '../profiles-table/profiles-table.component';

const appRoutes = [
  {path: '', component: MainComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'createProfile', component: CreateProfileComponent },
      {path: 'previewProfile', component: PreviewProfileComponent},
      {path: 'profilesTable', component: ProfilesTableComponent}
    ]
  }
];

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    CreateProfileComponent,
    PreviewProfileComponent,
    ProfilesTableComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    DropDownsModule,

  ],
  providers: [],
  exports: [
    MainComponent
  ]
})
export class MainModule {}
