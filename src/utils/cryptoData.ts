import { Cryptocurrency } from '@/types/crypto';

export const cryptocurrencies: Cryptocurrency[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    price: 43250.00
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'Ξ',
    price: 2280.00
  },
  {
    id: 'tether',
    symbol: 'USDT',
    name: 'Tether',
    icon: '₮',
    price: 1.00
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'Binance Coin',
    icon: 'B',
    price: 318.50
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    icon: 'S',
    price: 98.20
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    icon: 'A',
    price: 0.58
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'Ripple',
    icon: 'X',
    price: 0.62
  },
  {
    id: 'polkadot',
    symbol: 'DOT',
    name: 'Polkadot',
    icon: 'D',
    price: 7.85
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    icon: 'Ð',
    price: 0.095
  },
  {
    id: 'avalanche',
    symbol: 'AVAX',
    name: 'Avalanche',
    icon: 'A',
    price: 38.50
  }
];

export const getCryptoBySymbol = (symbol: string): Cryptocurrency | undefined => {
  return cryptocurrencies.find(crypto => crypto.symbol === symbol);
};

export const calculateExchangeRate = (from: string, to: string): number => {
  const fromCrypto = getCryptoBySymbol(from);
  const toCrypto = getCryptoBySymbol(to);
  
  if (!fromCrypto || !toCrypto || !fromCrypto.price || !toCrypto.price) {
    return 0;
  }
  
  return fromCrypto.price / toCrypto.price;
};