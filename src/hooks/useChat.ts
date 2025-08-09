import { useState, useEffect } from 'react';
import type { UserType } from '../types/Auth/user';
import { db, doc, collection, query, orderBy, onSnapshot, getDoc } from '../firebase/firebaseConfig';
import { ensureChatId } from '../firebase/firebaseChat';
import { useAuth } from '../components/AuthContext';

export const useChat = (uid: string | null, userFromState: UserType | undefined) => {
  const { user } = useAuth();

  const [userFromServer, setUserFromServer] = useState<UserType | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const otherUser = userFromState || userFromServer;

  const [chatId, setChatId] = useState<string | null>(null);
  const [chatExists, setChatExists] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // 1. Загрузка других пользователей
  useEffect(() => {
    if (uid && !userFromState) {
      setLoadingUser(true);
      const userDoc = doc(db, 'users', uid);
      const unsubscribe = onSnapshot(
        userDoc,
        (docSnap) => {
          if (docSnap.exists()) {
            setUserFromServer(docSnap.data() as UserType);
          } else {
            setUserFromServer(null);
          }
          setLoadingUser(false);
        },
        (error) => {
          console.error('Ошибка загрузки пользователя:', error);
          setLoadingUser(false);
        },
      );
      return () => unsubscribe();
    }
  }, [uid, userFromState]);

  // 2. Вычисление chatId и проверка существования чата
  useEffect(() => {
    if (!user?.uid || !otherUser?.uid) {
      setChatId(null);
      setChatExists(false);
      return;
    }

    const newChatId = ensureChatId(user.uid, otherUser.uid);
    setChatId(newChatId);

    const checkChatExists = async () => {
      const chatDocRef = doc(db, 'chats', newChatId);
      const docSnap = await getDoc(chatDocRef);
      setChatExists(docSnap.exists());
    };
    checkChatExists();
  }, [user, otherUser]);

  // 3. Подписка на сообщения
  useEffect(() => {
    if (!chatId || !chatExists) {
      setMessages([]);
      return;
    }

    setLoadingMessages(true);
    const messagesQuery = query(collection(db, `chats/${chatId}/messages`), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(
      messagesQuery,
      (querySnapshot) => {
        const msgs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMessages(msgs);
        setLoadingMessages(false);
      },
      (error) => {
        console.error('Ошибка загрузки сообщений:', error);
        setLoadingMessages(false);
      },
    );
    return () => unsubscribe();
  }, [chatId, chatExists]);

  return {
    user,
    otherUser,
    loadingUser,
    chatId,
    messages,
    loadingMessages,
    setChatExists,
  };
};
