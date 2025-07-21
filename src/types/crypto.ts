export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  price?: number;
}

export interface ExchangePair {
  from: Cryptocurrency;
  to: Cryptocurrency;
  fromAmount: string;
  toAmount: string;
  rate: number;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  min: number;
  max: number;
}