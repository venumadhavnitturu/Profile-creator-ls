import {Profile} from './models/profile-model';
import {ADD_PROFILE, CreateProfileAction, GET_PROFILE} from './profile-actions';

const initialState: Profile = {
  firstName: null,
  lastName: null,
  email: null,
  mobile: null,
  experience: null,
  currentOrg: null,
  skills: null,
  designation: null,
  profilePic: null
};

export function ProfileReducer(state: Profile = initialState, action: CreateProfileAction ) {

  switch (action.type) {
    case ADD_PROFILE:
      return {...state, ...action.payload};

    case GET_PROFILE:
      return {...state, ...action.payload};
    default: return state;
  }
}
