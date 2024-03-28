export interface IAmount {
  number: number;
  currency: string | null;
  price: number;
}

export interface ICurrency {
  code: string;
  date: string;
  price?: number;
}
