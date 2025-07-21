'use client';

import { useState, useEffect } from 'react';
import { ArrowDownUp, Lock, RefreshCw } from 'lucide-react';
import CryptoSelector from './CryptoSelector';
import { cryptocurrencies, calculateExchangeRate } from '@/utils/cryptoData';
import { Cryptocurrency } from '@/types/crypto';

export default function ExchangeWidget() {
  const [fromCrypto, setFromCrypto] = useState(cryptocurrencies[0]); // BTC
  const [toCrypto, setToCrypto] = useState(cryptocurrencies[1]); // ETH
  const [fromAmount, setFromAmount] = useState('0.01');
  const [toAmount, setToAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'crypto' | 'fiat'>('crypto');

  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const rate = calculateExchangeRate(fromCrypto.symbol, toCrypto.symbol);
      const result = parseFloat(fromAmount) * rate;
      setToAmount(result.toFixed(8));
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromCrypto, toCrypto]);

  const handleSwapCurrencies = () => {
    const temp = fromCrypto;
    setFromCrypto(toCrypto);
    setToCrypto(temp);
    setFromAmount(toAmount);
  };

  const rate = calculateExchangeRate(fromCrypto.symbol, toCrypto.symbol);

  return (
    <div className="px-6 pb-32">
      <h1 className="text-4xl font-light mb-2">
        Web3.0 Crypto Exchange Service
      </h1>
      <p className="text-text-secondary mb-8">
        Cryptocurrency exchange service. Review risks before swapping.
      </p>

      {/* Tab Switcher */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('crypto')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'crypto'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary'
          }`}
        >
          Crypto Exchange
        </button>
        <button
          onClick={() => setActiveTab('fiat')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'fiat'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary'
          }`}
        >
          Fiat Options
        </button>
      </div>

      {/* Exchange Form */}
      <div className="space-y-4">
        {/* From Section */}
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-text-secondary text-sm">You Send</label>
            <CryptoSelector
              selected={fromCrypto}
              onChange={setFromCrypto}
              cryptos={cryptocurrencies}
            />
          </div>
          <input
            type="text"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0"
            className="input-field"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={handleSwapCurrencies}
            className="bg-surface rounded-full p-3 border border-white/10 hover:bg-surface/80 transition-colors"
          >
            <ArrowDownUp className="w-5 h-5" />
          </button>
        </div>

        {/* To Section */}
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-text-secondary text-sm">You Get</label>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-text-secondary" />
              <CryptoSelector
                selected={toCrypto}
                onChange={setToCrypto}
                cryptos={cryptocurrencies}
              />
            </div>
          </div>
          <input
            type="text"
            value={toAmount}
            readOnly
            placeholder="0"
            className="input-field"
          />
        </div>

        {/* Exchange Rate */}
        <div className="flex items-center justify-between px-2 text-sm">
          <span className="text-text-secondary">
            Estimated rate: 1 {fromCrypto.symbol} ≈ {rate.toFixed(5)} {toCrypto.symbol}
          </span>
          <button className="text-primary hover:text-primary/80 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Button */}
      <button className="btn-primary w-full mt-8 text-lg">
        Explore
      </button>
    </div>
  );
}