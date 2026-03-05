import { format, isAfter, isBefore, isToday, isTomorrow, startOfDay, differenceInDays } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  if (isToday(d)) return 'Today';
  if (isTomorrow(d)) return 'Tomorrow';
  return format(d, 'MMM d, yyyy');
};

export const formatDateShort = (date) => {
  if (!date) return null;
  return format(new Date(date), 'MMM d');
};

export const isOverdue = (date, status) => {
  if (!date || status === 'done') return false;
  return isBefore(new Date(date), startOfDay(new Date()));
};

export const isDueSoon = (date, status) => {
  if (!date || status === 'done') return false;
  const days = differenceInDays(new Date(date), new Date());
  return days >= 0 && days <= 2;
};

export const toInputDate = (date) => {
  if (!date) return '';
  return format(new Date(date), 'yyyy-MM-dd');
};
