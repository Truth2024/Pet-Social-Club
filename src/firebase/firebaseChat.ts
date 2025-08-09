import { collection, doc, serverTimestamp, setDoc, addDoc, updateDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { db } from './firebaseConfig';

type Message = {
  from: string;
  text: string;
};

export const ensureChatId = (uidA: string, uidB: string) => {
  const [a, b] = [uidA, uidB].sort();
  return `${a}_${b}`;
};

export const useSendMessage = (chatId: string | null, currentUserId?: string, otherUserId?: string) => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(
    async (message: Message) => {
      if (!chatId) throw new Error('Chat ID is required');
      if (!currentUserId || !otherUserId) throw new Error('User IDs are required');
      if (message.from !== currentUserId) throw new Error('Отправитель сообщения не совпадает с текущим пользователем');

      setSending(true);
      setError(null);

      try {
        const chatDocRef = doc(db, 'chats', chatId);

        // Создаём чат, если его нет (setDoc с merge: true не перезапишет существующий документ)
        console.log('[sendMessage] Создаём чат, если его ещё нет');
        await setDoc(
          chatDocRef,
          {
            members: [currentUserId, otherUserId],
            lastMessage: null,
          },
          { merge: true },
        );

        // Добавляем сообщение в подколлекцию messages
        console.log('[sendMessage] Добавляем сообщение в подколлекцию messages');
        const messageRef = await addDoc(collection(db, `chats/${chatId}/messages`), {
          ...message,
          createdAt: serverTimestamp(),
        });
        console.log('[sendMessage] Message added id=', messageRef.id);

        // Обновляем lastMessage документа чата
        console.log('[sendMessage] Обновляем lastMessage документа чата');
        await updateDoc(chatDocRef, {
          lastMessage: {
            id: messageRef.id,
            ...message,
            createdAt: serverTimestamp(),
          },
        });
        console.log('[sendMessage] lastMessage успешно обновлён');
      } catch (err: any) {
        console.error('[sendMessage] Ошибка отправки (детали):', {
          name: err?.name,
          message: err?.message,
          code: err?.code,
          stack: err?.stack,
        });
        setError(err as Error);
        throw err;
      } finally {
        setSending(false);
      }
    },
    [chatId, currentUserId, otherUserId],
  );

  return { sendMessage, sending, error };
};
