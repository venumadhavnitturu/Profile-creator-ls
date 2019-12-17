import { Action } from '@ngrx/store';
import { Profile } from './models/profile-model';

export const ADD_PROFILE = '[PROFILE_CENTER] Create Profile';

export const GET_PROFILE = '[PROFILE_CENTER] Retrieve Profile';


export class AddProfileAction implements Action {
 readonly type = ADD_PROFILE;

  constructor(public payload: Profile) {}
}

export class RetrieveProfileAction implements  Action{
  readonly type = GET_PROFILE;

  constructor(public payload: Profile) {}
}

export type CreateProfileAction = AddProfileAction | RetrieveProfileAction;
