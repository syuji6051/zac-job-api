import { WorkMinute } from '@syuji6051/zac-client';
import { errors } from '@syuji6051/zac-job-library';
import { Dayjs } from 'dayjs';

const round = (day: Dayjs, minute: number, isUp: boolean = false): Dayjs => {
  const calc = isUp ? day.clone().add(minute, 'minute') : day.clone();
  const remainder = Math.trunc(calc.minute() / minute) * minute - day.minute();
  return day.clone().add(remainder, 'minute').startOf('minute');
};

const covertWorkMinute = (minute: number): WorkMinute => {
  if (minute === 0 || minute === 15 || minute === 30 || minute === 45) {
    return minute;
  }
  throw new errors.ValidationError('work minute is invalid');
};

export {
  round,
  covertWorkMinute,
};
