import React from 'react';
import styles from './sendPost.module.scss';
import { Avatar } from '../Avatar';
import { Spinner } from '../Spiner';
import { useAuth } from '../../components/AuthContext';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/firebaseConfig';
import { doc, collection, addDoc } from 'firebase/firestore';

export const SendPost = () => {
  const { user, loading } = useAuth();
  const [message, setMessage] = React.useState('');
  const [sending, setSending] = React.useState(false);

  const [userData, userLoading] = useDocumentData(user ? doc(db, 'users', user.uid) : null);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handlePost = async () => {
    if (!message.trim() || !user) return;

    setSending(true);
    try {
      await addDoc(collection(db, 'posts'), {
        authorId: user.uid,
        createdAt: Date.now(),
        text: message.trim(),
      });
      setMessage('');
    } catch (err) {
      console.error('Error adding post:', err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 600;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [message]);

  if (loading || userLoading) {
    return <Spinner />;
  }
  if (!user || !userData) return null;

  return (
    <div className="flex items-start gap-2 border-t border-b border-gray-200 p-[16px]">
      <Avatar name={userData.name} photoURL={userData.photoURL} />
      <div className="flex-1 flex-col">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className={`min-h-[46px] max-h-[600px] w-full resize-none p-2 rounded focus:outline-none overflow-y-auto ${styles.textArea}`}
          placeholder="What's happening?"
        />
        <div className="border-t border-b border-gray-200 flex justify-end p-[8px]">
          <button
            onClick={handlePost}
            disabled={!message.trim() || sending}
            className={`${styles.btn} ${message.trim() ? styles.active : ''}`}
          >
            {sending ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};
