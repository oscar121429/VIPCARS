export type RegisterForm = {
  name_user: string;
  last_name: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  password: string;
  rep_password: string;
};

export type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;