import {Specialization} from "@model/user/Specialization";

export interface UserInfo {

  department: number;
  factory: number;
  firstName: string;
  id: number;
  lastName: string;
  phone: string;
  specialization: Specialization;
  team: number;
  username: string;

}
