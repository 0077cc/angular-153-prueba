export interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  dni: number;
  status: number;
  created_at: number;
  updated_at: number;
}

export interface IUserOption {
  id: number;
  dni: number;
  user: string;
}
