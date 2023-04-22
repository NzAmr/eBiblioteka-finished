export interface User {
    id: number;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  }
  
  export interface CreateUserVM {
    email: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }
  
  export interface LoginVM {
    username: string;
    password: string;
  }