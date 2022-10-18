import { Role } from './role';

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: Role;
  token?: string;

  inst_id?: number;
  user_role?: string;
  user_id?: number;
  full_name?: string;
  user_name?: string;
  dp_location?: string;
  redirect_url?: string;
      }
