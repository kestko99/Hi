'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { Cryptocurrency } from '@/types/crypto';

interface CryptoSelectorProps {
  selected: Cryptocurrency;
  onChange: (crypto: Cryptocurrency) => void;
  cryptos: Cryptocurrency[];
}

export default function CryptoSelector({ selected, onChange, cryptos }: CryptoSelectorProps) {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative flex items-center gap-2 bg-surface/50 rounded-lg px-3 py-2 text-left cursor-pointer hover:bg-surface/70 transition-colors">
          <span className="text-2xl">{selected.icon}</span>
          <span className="font-medium">{selected.symbol}</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-surface border border-white/10 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            {cryptos.map((crypto) => (
              <Listbox.Option
                key={crypto.id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-3 px-4 ${
                    active ? 'bg-white/10' : ''
                  }`
                }
                value={crypto}
              >
                {({ selected }) => (
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{crypto.icon}</span>
                    <div className="flex-1">
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {crypto.symbol}
                      </span>
                      <span className="text-xs text-text-secondary">{crypto.name}</span>
                    </div>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}