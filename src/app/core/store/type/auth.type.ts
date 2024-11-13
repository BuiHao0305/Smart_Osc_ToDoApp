export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = {
  email: string;
  password: string;
  username: string;
};

export type ForgetPass = {
  email: string;
};

export type User = {
  id: string;
  email: string;
  username: string;
  avatar: string;
};

export type SignInResponse = {
  access_token: string;
};

export type UserResponse = {
  id: string;
  email: string;
  username: string;
  avatar: string;
};

export type ErrorResponse = {
  message: string;
  path: string;
  summary: string;
};
