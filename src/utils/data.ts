import { Timestamp } from 'firebase/firestore';

export const formatDateWithoutSeconds = (dateInput: string | Date | Timestamp): string => {
  if (!dateInput) return '';

  let date: Date;

  if (typeof dateInput === 'string') {
    date = new Date(dateInput);
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else if ('toDate' in dateInput && typeof dateInput.toDate === 'function') {
    date = dateInput.toDate();
  } else {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
