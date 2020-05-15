import { Work } from "app/entities/Works";

export interface Works {
  list(userId: string, password: string, yearMonth: string): Promise<Work[]>;
  put(userId: string, work: Work[]): Promise<void>;
};
