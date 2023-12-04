import { User } from 'src/app/user/interfaces/user';
import { Doctor } from './doctor';

export interface Chat {
  _id?: string;
  doctor_id?: Doctor;
  user_id?: User;
  latest_message?: string;
  createdAt?: string;
  updatedAt?: string;
}
