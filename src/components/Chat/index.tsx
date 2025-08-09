import React, { useState, useCallback } from 'react';
import { Avatar } from '../../ui/Avatar';
import styles from './chat.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Spinner } from '../../ui/Spiner';
import type { UserType } from '../../types/Auth/user';
import { MessageList } from '../../ui/MessageList';

// Импортируем кастомные хуки
import { useChat } from '../../hooks/useChat';
import { useSendMessage } from '../../firebase/firebaseChat';

export const Chat = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid');
  const location = useLocation();
  const userFromState = location.state as UserType | undefined;

  // Используем кастомный хук для получения всех данных чата
  const { user, otherUser, loadingUser, chatId, messages, loadingMessages, setChatExists } = useChat(
    uid,
    userFromState,
  );

  const [message, setMessage] = useState('');
  const { sendMessage, sending, error } = useSendMessage(chatId, user?.uid, otherUser?.uid);

  const handleSendMessage = useCallback(async () => {
    if (message.trim() === '') return;
    if (!user?.uid || !chatId || !otherUser?.uid) return;

    try {
      await sendMessage({ from: user.uid, text: message.trim() });
      setMessage('');
      // Обновляем состояние, чтобы запустить подписку, если чат только что создан
      setChatExists(true);
    } catch (e) {
      console.error('Ошибка отправки сообщения:', e);
    }
  }, [message, sendMessage, user, chatId, otherUser, setChatExists]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (message.trim() !== '' && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [message, handleSendMessage],
  );

  if (loadingUser || (uid && !otherUser) || !user) {
    return <Spinner />;
  }

  if (!otherUser) {
    return <div>Ошибка загрузки пользователя или пользователь не найден.</div>;
  }

  return (
    <div className={`left  border-gray-300 flex flex-col h-full`}>
      <div
        className={`${styles.user} border-b border-gray-300 h-[80px] md:h-[250px] flex flex-row md:flex-col items-center justify-center`}
      >
        <Avatar
          name={otherUser.name}
          photoURL={otherUser.photoURL}
          size="w-[40px] h-[40px] md:h-[80px] md:w-[80px] rounded-[50%] mb-0 md:mb-2"
        />
        <span className="font-base md:font-bold text-sm md:text-xl">{otherUser.name}</span>
      </div>

      <div className={`${styles.scroll} flex flex-col flex-1 gap-2 p-4 overflow-y-auto `}>
        {chatId && !loadingMessages ? (
          <MessageList chatId={chatId} messages={messages} currentUserId={user?.uid || ''} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            {loadingMessages ? 'Загрузка сообщений...' : 'Начните новую беседу.'}
          </div>
        )}
      </div>

      <div className="h-[60px] bg-gray-100 p-[16px] flex items-center gap-2">
        <textarea
          aria-label="Message input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="w-full resize-none p-2 rounded focus:outline-none overflow-y-auto"
          placeholder="Start a new message"
          disabled={sending || !chatId}
        />
        <button
          type="button"
          onClick={handleSendMessage}
          disabled={message.trim() === '' || sending || !chatId}
          className={`${message.trim() === '' ? styles.disable : styles.svg} cursor-pointer`}
          aria-label="Send message"
        >
          <svg width={30} height={30} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z" />
            </g>
          </svg>
        </button>
      </div>

      {error && <div className="text-red-600 text-center mt-2">Ошибка отправки: {error.message}</div>}
    </div>
  );
};
