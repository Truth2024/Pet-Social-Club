import type { Timestamp } from 'firebase/firestore';

export interface UserType {
  uid: string;
  email: string;
  name: string; // <-- вместо displayName, как в базе
  photoURL: string;
  createdAt?: Timestamp; // если в БД всегда Timestamp, лучше так
}
