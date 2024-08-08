import { registerUser } from './auth/register.action';
import { logoutUser } from './auth/logout.actions';
import { login } from './auth/login.action';
import { loginGoogle } from './auth/login-google.action';

export const server = {
   registerUser,  
   logoutUser,
   login,
   loginGoogle
}