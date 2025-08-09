// Импорт основных функций из SDK Firebase
import { initializeApp } from 'firebase/app'; // Инициализация приложения Firebase
import { getAuth, signOut, updateProfile } from 'firebase/auth'; // Аутентификация: получение объекта auth и функция выхода
import {
  getFirestore,
  collection,
  getDocs,
  serverTimestamp,
  addDoc,
  setDoc,
  doc,
  where,
  query,
  onSnapshot,
  orderBy,
  getDoc,
} from 'firebase/firestore';
// Firestore: работа с базой данных, коллекциями, чтением данных и серверным временем

// Конфигурация Firebase из переменных окружения (Vite)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // API-ключ проекта
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // Домен для аутентификации
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, // Идентификатор проекта Firebase
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // Хранилище (например, для файлов)
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // Идентификатор отправителя сообщений
  appId: import.meta.env.VITE_FIREBASE_APP_ID, // ID приложения Firebase
};

// Инициализация Firebase-приложения с переданной конфигурацией
const app = initializeApp(firebaseConfig);

// Экспорт сервиса аутентификации (auth)
export const auth = getAuth(app);

// Экспорт базы данных Firestore
export const db = getFirestore(app);

// Повторный экспорт утилит Firestore для использования в других модулях
export {
  collection, // Создание ссылки на коллекцию в Firestore
  getDocs, // Получение документов из коллекции
};

// Повторный экспорт функции выхода из аккаунта
export { signOut };

//

export { updateProfile };
export { addDoc };
export { setDoc };
export { doc };
export { where };
export { query };
export { onSnapshot };
export { orderBy };
export { getDoc };

// Повторный экспорт серверного timestamp (временная метка с сервера Firebase)
export { serverTimestamp };
