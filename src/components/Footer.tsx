'use client';

import { useState } from 'react';
import { Leaf } from 'lucide-react';

export default function Footer() {
  const [showCookieNotice, setShowCookieNotice] = useState(true);

  return (
    <>
      {/* Buy Crypto Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-lg border-t border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">Buy crypto with</span>
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              <span className="font-medium">Trustpilot</span>
            </div>
          </div>
        </div>

        {/* Cookie Notice */}
        {showCookieNotice && (
          <div className="bg-surface border-t border-white/10 px-6 py-4">
            <p className="text-sm mb-4">
              We use cookies. By using ChangeNOW, you agree to{' '}
              <a href="#" className="text-primary hover:underline">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
            <button
              onClick={() => setShowCookieNotice(false)}
              className="btn-primary w-full"
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </>
  );
}