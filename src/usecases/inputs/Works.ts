export interface WorkInput {
  getUserId(): string;
}

export interface WorkListInput extends WorkInput {
  getYearMonth(): string;
};

export interface WorkClockInInput extends WorkInput {};
export interface WorkClockOutInput extends WorkInput {};
export interface WorkGoOutInput extends WorkInput {};
export interface WorkGoReturnInput extends WorkInput {};
