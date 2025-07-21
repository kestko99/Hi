'use client';

import { useEffect, useState } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function Header() {
  const [time, setTime] = useState('9:31');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Status Bar */}
      <div className="bg-background px-6 py-2 flex justify-between items-center text-sm">
        <div className="flex-1">
          <span className="font-medium">{time}</span>
        </div>
        <div className="flex items-center gap-1">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <div className="flex items-center gap-0.5">
            <span className="text-xs">67</span>
            <Battery className="w-5 h-5" />
          </div>
        </div>
      </div>
      
      {/* App Header */}
      <div className="bg-background/95 backdrop-blur-lg px-6 py-4 text-center">
        <h1 className="text-lg font-normal">changenow.io</h1>
      </div>
    </div>
  );
}