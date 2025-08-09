import { formatTimeFromNow } from '../../utils/formatRegistrationDate';
import styles from './index.module.scss';
import { useEffect, useRef } from 'react';
import type { DocumentData } from 'firebase/firestore';

interface Props {
  messages: DocumentData[]; // или твой тип с from/text/createdAt
  currentUserId: string;
  chatId?: string | null;
}

export const MessageList = ({ messages, currentUserId }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col">
      {messages.map((msg, idx) => {
        const isCurrentUser = msg.from === currentUserId;

        return (
          <div
            key={msg.id || idx}
            className={`${styles.bubbleBase} ${isCurrentUser ? styles.bubbleUser : styles.bubbleOther}`}
          >
            <div>{msg.text}</div>
            {msg.createdAt && <div className={styles.messageTime}>{formatTimeFromNow(msg.createdAt)}</div>}
          </div>
        );
      })}

      {/* Невидимый якорь для автоскролла */}
      <div ref={bottomRef} />
    </div>
  );
};
