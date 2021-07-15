import { WorkMinute } from '@syuji6051/zac-client';
import { errors } from '@syuji6051/zac-job-library';
import { Dayjs } from 'dayjs';
import { divide, round as calcRound } from '@/src/helper/calc';

const round = (day: Dayjs, minute: number, isUp: boolean = false): Dayjs => {
  const calc = isUp ? day.clone().add(minute, 'minute') : day.clone();
  const remainder = Math.trunc(calc.minute() / minute) * minute - day.minute();
  return day.clone().add(remainder, 'minute').startOf('minute');
};

const convert60to10minute = (time60: string) => {
  const [hour, minute] = time60.split(':');
  return Number(hour) + calcRound(divide(Number(minute), 60), 2);
};

const covertWorkMinute = (minute: number): WorkMinute => {
  if (minute === 0 || minute === 15 || minute === 30 || minute === 45) {
    return minute;
  }
  throw new errors.ValidationError('work minute is invalid');
};

const workBreakTime = (workTime: number): number => {
  switch (true) {
    case (workTime > 450):
      return 60;
    case workTime > 360:
      return 45;
    default:
      return 0;
  }
};

export {
  round,
  covertWorkMinute,
  convert60to10minute,
  workBreakTime,
};
