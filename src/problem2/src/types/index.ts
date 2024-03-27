export interface Amount {
  number: number;
  currency: string | null;
  price: number;
}

export interface Currency {
  code: string;
  date: string;
  price?: number;
}
