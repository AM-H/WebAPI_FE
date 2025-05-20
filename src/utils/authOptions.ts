import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// project import
import axios from 'utils/axios';
import { isNumber, isLowercaseChar, isUppercaseChar, isSpecialChar, minLength, isValidRole } from './password-validation';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('/login', {
            password: credentials?.password,
            email: credentials?.email
          });
          if (user) {
            user.data.user['accessToken'] = user.data.accessToken;
            return user.data.user;
          }
        } catch (e: any) {
          console.error(e);
          const errorMessage = e?.message || e?.response?.data?.message || 'Something went wrong!';
          throw new Error(errorMessage);
        }
      }
    }),
    CredentialsProvider({
      id: 'register',
      name: 'register',
      credentials: {
        firstname: { name: 'firstname', label: 'First Name', type: 'text', placeholder: 'Enter First Name' },
        lastname: { name: 'lastname', label: 'Last Name', type: 'text', placeholder: 'Enter Last Name' },
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' },
        username: { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter Username' },
        role: { name: 'role', label: 'Role', type: 'number', placeholder: 'Enter Role (1-5)' },
        phone: { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'Enter Phone Number' }
      },
      async authorize(credentials) {
        try {
          // Check for required fields
          if (
            !credentials?.firstname ||
            !credentials?.lastname ||
            !credentials?.email ||
            !credentials?.password ||
            !credentials?.username ||
            !credentials?.phone
          ) {
            throw new Error('Missing required information');
          }

          // Validate password
          const passwordErrors: string[] = [];
          if (!minLength(credentials.password)) {
            passwordErrors.push('Password must be at least 12 characters long');
          }
          if (!isUppercaseChar(credentials.password)) {
            passwordErrors.push('Password must contain at least 1 uppercase letter');
          }
          if (!isLowercaseChar(credentials.password)) {
            passwordErrors.push('Password must contain at least 1 lowercase letter');
          }
          if (!isNumber(credentials.password)) {
            passwordErrors.push('Password must contain at least 1 digit');
          }
          if (!isSpecialChar(credentials.password)) {
            passwordErrors.push("Password must contain at least 1 special character (!@#$%^&*(),.?':{}|<>)");
          }

          if (passwordErrors.length > 0) {
            throw new Error(`Invalid password: ${passwordErrors.join(', ')}`);
          }

          // Validate email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(credentials.email)) {
            throw new Error('Invalid email');
          }

          // Validate phone (10-15 digits)
          const digitsOnly = credentials.phone.replace(/\D/g, '');
          if (digitsOnly.length < 10 || digitsOnly.length > 15) {
            throw new Error('Invalid phone number: Must be between 10 and 15 digits');
          }

          // Validate role (must be 1-5)
          const role = Number(credentials.role || 1);
          if (!isValidRole(role)) {
            throw new Error('Invalid or missing role: Role must be a number between 1-5');
          }

          // Make API call with validated data
          const user = await axios.post('/register', {
            firstname: credentials.firstname,
            lastname: credentials.lastname,
            email: credentials.email,
            password: credentials.password,
            username: credentials.username,
            role: role,
            phone: credentials.phone
          });

          if (user) {
            user.data.user['accessToken'] = user.data.accessToken;
            return user.data.user;
          }
        } catch (e: any) {
          console.error(e);
          const errorMessage = e?.message || e?.response?.data?.message || 'Something went wrong!';
          throw new Error(errorMessage);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        // @ts-ignore
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.provider = token.provider;
        session.token = token;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },
  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};
