export interface WorkInput {
  getUserId(): string;
}

export interface WorkListInput extends WorkInput {
  getYearMonth(): string;
}
