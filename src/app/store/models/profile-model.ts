export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  experience: number;
  currentOrg: string;
  skills: Array<string>;
  designation: string;
  profilePic?: string;
}
