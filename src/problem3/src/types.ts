export interface WalletBalance {
  currency: string;
  amount: number;
}
export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

export interface Price {
  currency: string;
  date: string;
  price: number;
}
