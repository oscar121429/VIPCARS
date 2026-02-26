export interface AdminUser {
  user_id: number;
  name_user: string;
  last_name: string;
  email: string;
  phone: string;
  picture_user: string;
  is_deleted:number;
}

export interface AdminUsersResponse {
  users: AdminUser[];
}