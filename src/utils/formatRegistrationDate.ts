import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';

dayjs.extend(relativeTime);

// Переопределяем локаль с добавлением "назад"
dayjs.locale('ru', {
  relativeTime: {
    future: 'через %s',
    past: '%s назад', // обязательно здесь
    s: 'несколько секунд',
    m: 'минуту',
    mm: '%d минут',
    h: 'час',
    hh: '%d часов',
    d: 'день',
    dd: '%d дней',
    M: 'месяц',
    MM: '%d месяцев',
    y: 'год',
    yy: '%d лет',
  },
});

type FirestoreDate = string | { toDate: () => Date } | { seconds: number; nanoseconds: number } | null | undefined;

export const formatRegistrationDate = (createdAt: FirestoreDate): string => {
  if (!createdAt) return 'неизвестно';

  let date: Date;

  if (typeof createdAt === 'string') {
    date = new Date(createdAt);
  } else if ('toDate' in createdAt && typeof createdAt.toDate === 'function') {
    date = createdAt.toDate();
  } else if (
    'seconds' in createdAt &&
    typeof createdAt.seconds === 'number' &&
    typeof createdAt.nanoseconds === 'number'
  ) {
    // seconds → миллисекунды
    date = new Date(createdAt.seconds * 1000);
  } else {
    return 'неизвестно';
  }

  return dayjs(date).fromNow();
};
export const parseDate = (value: FirestoreDate): Date | null => {
  if (!value) return null;

  if (typeof value === 'string') {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  if ('toDate' in value && typeof value.toDate === 'function') {
    return value.toDate();
  }

  return null;
};

export const formatTimeFromNow = (value: FirestoreDate): string => {
  const date = parseDate(value);
  if (!date) return 'неизвестно';

  const now = new Date();
  if (date.getTime() > now.getTime()) {
    // Если дата в будущем — значит ещё нет точного времени, можно вернуть 'только что' или 'несколько секунд назад'
    return 'только что';
  }

  return dayjs(date).fromNow();
};
