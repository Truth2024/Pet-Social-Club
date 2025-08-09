export function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-credential':
      return 'Invalid email or password';
    case 'auth/user-not-found':
      return 'User not found';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    default:
      return 'Login failed. Please try again';
  }
}
