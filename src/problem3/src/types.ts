export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // add property "blockchain"
}
export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

export interface Price {
  currency: string;
  date: string;
  price: number;
}
