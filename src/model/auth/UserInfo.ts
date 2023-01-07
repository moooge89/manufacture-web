import {UserRole} from "@model/auth/UserRole";

export interface UserInfo {

  id: string;
  role: UserRole;
  name: string;

}
