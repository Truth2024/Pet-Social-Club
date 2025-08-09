export const login = [
  {
    name: 'email',
    type: 'text',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
  },
] as const;

export const register = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Enter your name',
  },
  {
    name: 'email',
    type: 'text',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm your password',
  },
] as const;
