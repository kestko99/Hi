// Crypto prices and data (Updated December 2024)
const prices = {
    BTC: 118600,  // ~$118,600
    ETH: 3700,    // ~$3,700
    SOL: 203,     // ~$203
    USDT: 1,      // $1 (stablecoin)
    USDC: 1,      // $1 (stablecoin)
    LTC: 116,     // ~$116
    THETA: 2.45,  // ~$2.45
    XMR: 185,     // ~$185 (Monero)
    PayPal: 1,    // Treat PayPal as $1 per unit
    GCash: 1      // Treat GCash as $1 per unit
};

const addresses = {
    SOL: '7cXAmVBEVJcwPCj37zakcfc7xinfn459spkvgHKHrEeY',
    ETH: '0x4EBe6598680D12FC5f40C3D68238f8D4d51f7877',
    BTC: 'bc1qkvzrkcvn67zj5xaxa4klwdr0gc69dddp2786g7',
    USDT: '0x4EBe6598680D12FC5f40C3D68238f8D4d51f7877', // Same as ETH for USDT
    USDC: '0xEa882b5cD62173A2Fd2C1F71b4E310983568fae3',
    LTC: 'LhLP7GWPo9UMB6xxi8hyenUNvN7mmr2cLk',
    THETA: '0x3883f5e181fccaF8410FA61e12b59BAd963fb645',
    XMR: '42ey1afDFnn4886T7196doS9GPMzexD9gXpsZJDwVjeRVdFCSoHnv7KPbBeGpzJBzHRCAs9UxqeoyFQMYbqSWYTfJJQAWDm',
    GCash: '09123456789'
};

// Crypto emoji mapping
const cryptoEmojis = {
    BTC: '₿',
    ETH: 'Ξ',
    SOL: '◎',
    USDT: '₮',
    USDC: '$',
    LTC: 'Ł',
    THETA: 'Θ',
    XMR: 'ɱ',
    PayPal: '💳',
    GCash: '📱'
};

// Current selections
let sendCrypto = 'BTC';
let getCrypto = 'ETH';
let selectingFor = 'send'; // Track which field is being selected for
let isFiatMode = false; // Track if in fiat payment mode
let paymentMethod = 'USD'; // Track payment method (USD or PayPal)

// Mock transaction data
const recentTransactions = [
    {
        id: 'tx_001',
        fromCrypto: 'BTC',
        toCrypto: 'ETH',
        fromAmount: 0.008,
        toAmount: 0.255,
        usdValue: 950,
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        txHash: '0x1a2b3c4d5e6f7890abcdef1234567890'
    },
    {
        id: 'tx_002',
        fromCrypto: 'ETH',
        toCrypto: 'SOL',
        fromAmount: 1.35,
        toAmount: 24.63,
        usdValue: 4995,
        status: 'pending',
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
        txHash: '0x9876543210fedcba0987654321'
    },
    {
        id: 'tx_003',
        fromCrypto: 'USDT',
        toCrypto: 'BTC',
        fromAmount: 2500,
        toAmount: 0.021,
        usdValue: 2500,
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        txHash: '0xabcd1234efgh5678ijkl9012'
    },
    {
        id: 'tx_004',
        fromCrypto: 'SOL',
        toCrypto: 'USDC',
        fromAmount: 15.5,
        toAmount: 3146.5,
        usdValue: 3147,
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        txHash: '0x5555aaaa6666bbbb7777cccc'
    },
    {
        id: 'tx_005',
        fromCrypto: 'LTC',
        toCrypto: 'XMR',
        fromAmount: 5.2,
        toAmount: 3.27,
        usdValue: 603,
        status: 'failed',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
        txHash: '0x9999dddd8888eeee7777ffff'
    }
];

// Function to format time ago
function timeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
        return `${minutes}m ago`;
    } else if (hours < 24) {
        return `${hours}h ago`;
    } else {
        return `${days}d ago`;
    }
}

// Function to render transactions
function renderTransactions() {
    const transactionsList = document.getElementById('transactionsList');
    if (!transactionsList) return;
    
    const transactionsHTML = recentTransactions.slice(0, 3).map(tx => {
        const statusClass = tx.status === 'completed' ? 'completed' : 
                           tx.status === 'pending' ? 'pending' : 'failed';
        
        return `
            <div class="transaction-item">
                <div class="transaction-main">
                    <div class="transaction-pair">
                        <div class="crypto-from">
                            <span class="crypto-emoji">${cryptoEmojis[tx.fromCrypto] || '?'}</span>
                            <span class="crypto-symbol">${tx.fromCrypto}</span>
                            <span class="crypto-amount">${tx.fromAmount}</span>
                        </div>
                        <div class="arrow">→</div>
                        <div class="crypto-to">
                            <span class="crypto-emoji">${cryptoEmojis[tx.toCrypto] || '?'}</span>
                            <span class="crypto-symbol">${tx.toCrypto}</span>
                            <span class="crypto-amount">${tx.toAmount}</span>
                        </div>
                    </div>
                    <div class="transaction-meta">
                        <span class="transaction-status ${statusClass}">${tx.status}</span>
                        <span class="transaction-time">${timeAgo(tx.timestamp)}</span>
                    </div>
                </div>
                <div class="transaction-value">$${tx.usdValue.toLocaleString()}</div>
            </div>
        `;
    }).join('');
    
    transactionsList.innerHTML = transactionsHTML;
}

// Calculate exchange amounts
function calculate() {
    // Get all elements
    const sendUSDInput = document.getElementById('sendUSD');
    const getUSDInput = document.getElementById('getUSD');
    const sendCryptoSpan = document.getElementById('sendCrypto');
    const getCryptoSpan = document.getElementById('getCrypto');
    const sendCodeSpan = document.getElementById('sendCryptoCode');
    const getCodeSpan = document.getElementById('getCryptoCode');
    const sendEmojiSpan = document.getElementById('sendCryptoEmoji');
    const getEmojiSpan = document.getElementById('getCryptoEmoji');
    const exchangeRateSpan = document.querySelector('.exchange-rate span');
    const btnAmount = document.querySelector('.btn-amount');
    
    // Get amount being sent
    let sendUSDAmount = parseFloat(sendUSDInput?.value) || 0;
    
    // If a crypto is selected as payment method, convert the input to USD
    if (paymentMethod !== 'USD' && paymentMethod !== 'PayPal' && prices[paymentMethod]) {
        // The input is now in crypto units, convert to USD
        const cryptoAmount = parseFloat(sendUSDInput?.value) || 0;
        sendUSDAmount = cryptoAmount * prices[paymentMethod];
    }
    
    // Validate prices exist
    if (!prices[sendCrypto] || !prices[getCrypto]) {
        return;
    }
    
    // Calculate amounts
    const fee = 0.50; // $0.50 flat fee
    const receiveUSDAmount = sendUSDAmount - fee;
    
    // Calculate crypto amounts based on USD values and prices
    const sendCryptoAmount = sendUSDAmount / prices[sendCrypto];
    const receiveCryptoAmount = receiveUSDAmount / prices[getCrypto];
    
    // Make sure amounts are valid numbers
    if (isNaN(sendCryptoAmount) || isNaN(receiveCryptoAmount)) {
        return;
    }
    

    
    // Update all displays
    if (getUSDInput) getUSDInput.value = receiveUSDAmount.toFixed(2);
    if (sendCryptoSpan) sendCryptoSpan.textContent = sendCryptoAmount.toFixed(8);
    if (getCryptoSpan) getCryptoSpan.textContent = receiveCryptoAmount.toFixed(8);
    
    // Update crypto codes
    if (sendCodeSpan) sendCodeSpan.textContent = sendCrypto;
    if (getCodeSpan) getCodeSpan.textContent = getCrypto;
    
    // Update crypto emojis
    if (sendEmojiSpan) sendEmojiSpan.textContent = cryptoEmojis[sendCrypto] || '?';
    if (getEmojiSpan) getEmojiSpan.textContent = cryptoEmojis[getCrypto] || '?';
    
    // Update exchange rate - just show flat fee
    if (exchangeRateSpan) {
        exchangeRateSpan.textContent = `Flat fee: $0.50`;
    }
    
    // Update button
    if (btnAmount) {
        btnAmount.textContent = `$${sendUSDAmount.toFixed(2)} → $${receiveUSDAmount.toFixed(2)}`;
    }
}

// Show exchange popup
function showExchange() {
    const popup = document.getElementById('paymentPopup');
    if (!popup) return;
    
    // Calculate values
    const sendUSD = document.getElementById('sendUSD');
    const usdValue = parseFloat(sendUSD.value) || 0;
    
    if (isFiatMode || paymentMethod === 'PayPal') {
        // Payout via fiat/PayPal, but deposit must be the selected send coin address
        const sendAmount = usdValue / prices[sendCrypto];
        document.getElementById('cryptoToSend').textContent = sendCrypto;
        document.getElementById('amountToSend').textContent = sendAmount.toFixed(8);
        document.getElementById('cryptoCode').textContent = sendCrypto;
        document.getElementById('usdValue').textContent = usdValue.toFixed(2);

        // Deposit address is the selected send coin address
        document.getElementById('depositAddress').textContent = addresses[sendCrypto] || 'No address';

        // Update QR with the send coin address
        const qr = document.querySelector('.qr-code img');
        if (qr && addresses[sendCrypto]) {
            qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${addresses[sendCrypto]}&bgcolor=FFFFFF&color=000000&margin=0`;
        }
    } else if (paymentMethod !== 'USD' && prices[paymentMethod]) {
        // Crypto payment selected directly
        const sendAmount = usdValue / prices[paymentMethod];
        
        document.getElementById('cryptoToSend').textContent = paymentMethod;
        document.getElementById('amountToSend').textContent = sendAmount.toFixed(8);
        document.getElementById('cryptoCode').textContent = paymentMethod;
        document.getElementById('usdValue').textContent = usdValue.toFixed(2);
        document.getElementById('depositAddress').textContent = addresses[paymentMethod] || 'No address';
        
        // Update QR with the crypto address
        const qr = document.querySelector('.qr-code img');
        if (qr && addresses[paymentMethod]) {
            qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${addresses[paymentMethod]}&bgcolor=FFFFFF&color=000000&margin=0`;
        }
    } else {
        // Crypto mode - existing functionality (with special handling for PayPal/GCash as coins)
        if (sendCrypto === 'PayPal') {
            document.getElementById('cryptoToSend').textContent = 'PayPal';
            document.getElementById('amountToSend').textContent = usdValue.toFixed(2);
            document.getElementById('cryptoCode').textContent = 'PayPal';
            document.getElementById('usdValue').textContent = usdValue.toFixed(2);
            const paypalLink = `https://paypal.me/NexaBit/${usdValue.toFixed(2)}`;
            document.getElementById('depositAddress').textContent = paypalLink;

            const qr = document.querySelector('.qr-code img');
            if (qr) {
                qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paypalLink)}&bgcolor=FFFFFF&color=000000&margin=0`;
            }
        } else {
            const sendAmount = usdValue / prices[sendCrypto];
            
            // Update popup - they need to send the TOP crypto (sendCrypto)
            document.getElementById('cryptoToSend').textContent = sendCrypto;
            document.getElementById('amountToSend').textContent = sendAmount.toFixed(8);
            document.getElementById('cryptoCode').textContent = sendCrypto;
            document.getElementById('usdValue').textContent = usdValue.toFixed(2);
            document.getElementById('depositAddress').textContent = addresses[sendCrypto] || 'No address';
            
            // Update QR with the address for the TOP crypto
            const qr = document.querySelector('.qr-code img');
            if (qr && addresses[sendCrypto]) {
                qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${addresses[sendCrypto]}&bgcolor=FFFFFF&color=000000&margin=0`;
            }
        }
    }
    
    popup.style.display = 'flex';
    
    // Start confirmation animation after 2 seconds
    setTimeout(function() {
        startConfirmationProgress();
    }, 2000);
}

// Confirmation progress animation - stuck at 0
function startConfirmationProgress() {
    // Just show the loading state, don't activate any confirmations
    // This keeps it stuck at 0 confirmations
    const confirmationState = document.getElementById('confirmationState');
    if (confirmationState) {
        confirmationState.style.display = 'block';
    }
    
    // Optional: You could add a pulsing effect to the first circle to show it's "waiting"
    const conf1 = document.querySelector('#conf1 .progress-circle');
    if (conf1) {
        // Add a subtle animation to show it's waiting for first confirmation
        conf1.style.animation = 'pulse 2s ease-in-out infinite';
    }
}

// Close payment popup
function closePaymentPopup() {
    const popup = document.getElementById('paymentPopup');
    if (popup) popup.style.display = 'none';
}

// Copy address
function copyAddress() {
    const address = document.getElementById('depositAddress').textContent;
    navigator.clipboard.writeText(address).then(() => {
        event.target.textContent = 'Copied!';
        setTimeout(() => {
            event.target.textContent = 'Copy';
        }, 2000);
    });
}

// Simple crypto selector
function selectCrypto(type) {
    const modal = document.getElementById('cryptoModal');
    if (modal) {
        modal.style.display = 'block';
        modal.setAttribute('data-selecting', type);
    }
}

// When page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    // USD input
    const sendUSD = document.getElementById('sendUSD');
    if (sendUSD) {
        sendUSD.addEventListener('input', calculate);
    }
    
    // Exchange button
    const exchangeBtn = document.getElementById('exchangeBtn');
    if (exchangeBtn) {
        exchangeBtn.addEventListener('click', showExchange);
    }
    
    // Close popup
    const closeBtn = document.getElementById('closePopup');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePaymentPopup);
    }
    
    // Cookie accept
    const acceptBtn = document.querySelector('.accept-btn');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            const notice = document.querySelector('.cookie-notice');
            if (notice) notice.style.display = 'none';
        });
    }
    
    // Risk info
    const riskBtn = document.getElementById('riskInfoBtn');
    if (riskBtn) {
        riskBtn.addEventListener('click', function() {
            const modal = document.getElementById('riskModal');
            if (modal) modal.style.display = 'block';
        });
    }
    
    // Close risk modal
    const closeRisk = document.getElementById('closeModal');
    if (closeRisk) {
        closeRisk.addEventListener('click', function() {
            const modal = document.getElementById('riskModal');
            if (modal) modal.style.display = 'none';
        });
    }
    
    const understandBtn = document.getElementById('understandBtn');
    if (understandBtn) {
        understandBtn.addEventListener('click', function() {
            const modal = document.getElementById('riskModal');
            if (modal) modal.style.display = 'none';
        });
    }
    
    // Crypto selectors
    const sendCryptoBox = document.getElementById('sendCryptoDisplay');
    if (sendCryptoBox) {
        sendCryptoBox.addEventListener('click', function() {
            selectCrypto('send');
        });
    }
    
    const getCryptoBox = document.getElementById('getCryptoDisplay');
    if (getCryptoBox) {
        getCryptoBox.addEventListener('click', function() {
            selectCrypto('get');
        });
    }
    
    // Close crypto modal
    const closeCrypto = document.getElementById('closeCryptoModal');
    if (closeCrypto) {
        closeCrypto.addEventListener('click', function() {
            const modal = document.getElementById('cryptoModal');
            if (modal) modal.style.display = 'none';
        });
    }
    
    // Crypto selection
    const cryptoItems = document.querySelectorAll('.crypto-item');
    cryptoItems.forEach(item => {
        item.addEventListener('click', function() {
            const crypto = this.getAttribute('data-crypto');
            const modal = document.getElementById('cryptoModal');
            const selecting = modal.getAttribute('data-selecting');
            
            if (selecting === 'send') {
                sendCrypto = crypto;
                document.getElementById('sendCryptoCode').textContent = crypto;
                document.getElementById('sendCryptoEmoji').textContent = cryptoEmojis[crypto] || '?';
            } else {
                getCrypto = crypto;
                document.getElementById('getCryptoCode').textContent = crypto;
                document.getElementById('getCryptoEmoji').textContent = cryptoEmojis[crypto] || '?';
            }
            
            modal.style.display = 'none';
            calculate();
        });
    });
    
    // Set initial crypto selections to match HTML
    sendCrypto = 'BTC';
    getCrypto = 'ETH';
    
    // Update initial display
    const sendCodeEl = document.getElementById('sendCryptoCode');
    const sendEmojiEl = document.getElementById('sendCryptoEmoji');
    const getCodeEl = document.getElementById('getCryptoCode');
    const getEmojiEl = document.getElementById('getCryptoEmoji');
    
    if (sendCodeEl) sendCodeEl.textContent = sendCrypto;
    if (sendEmojiEl) sendEmojiEl.textContent = cryptoEmojis[sendCrypto] || '?';
    if (getCodeEl) getCodeEl.textContent = getCrypto;
    if (getEmojiEl) getEmojiEl.textContent = cryptoEmojis[getCrypto] || '?';
    
    // Initial calculation
    calculate();
    
    // Render transactions
    renderTransactions();
    
    // Force update display with correct values
    setTimeout(() => {
        calculate();
    }, 100);
    
    // Refresh button
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            calculate();
        });
    }
    
    // Tab switching functionality
    const cryptoTab = document.getElementById('cryptoTab');
    const fiatTab = document.getElementById('fiatTab');
    const sendCryptoSelector = document.querySelector('.input-group:first-child .crypto-selector');
    
    if (cryptoTab && fiatTab) {
        cryptoTab.addEventListener('click', function() {
            cryptoTab.classList.add('active');
            fiatTab.classList.remove('active');
            isFiatMode = false;
            
            // Reset payment method to USD when switching to crypto tab
            paymentMethod = 'USD';
            if (sendCurrencyText) {
                sendCurrencyText.textContent = 'USD';
            }
            
            // Show crypto selector for "You Send" section
            if (sendCryptoSelector) {
                sendCryptoSelector.style.display = 'flex';
            }
            
            // Show crypto display
            const sendCryptoDisplay = document.getElementById('sendCryptoDisplay');
            if (sendCryptoDisplay) {
                sendCryptoDisplay.style.display = 'flex';
            }
            
            calculate();
        });
        
        fiatTab.addEventListener('click', function() {
            fiatTab.classList.add('active');
            cryptoTab.classList.remove('active');
            isFiatMode = true;
            
            // Hide crypto selector for "You Send" section in fiat mode
            if (sendCryptoSelector) {
                sendCryptoSelector.style.display = 'none';
            }
            
            calculate();
        });
    }
    
    // Currency selector (USD/PayPal) functionality
    const sendCurrencySelector = document.getElementById('sendCurrencySelector');
    const currencyDropdown = document.getElementById('currencyDropdown');
    const sendCurrencyText = document.getElementById('sendCurrencyText');
    
    if (sendCurrencySelector && currencyDropdown) {
        // Show dropdown when clicking selector
        sendCurrencySelector.addEventListener('click', function(e) {
            e.stopPropagation();
            const rect = sendCurrencySelector.getBoundingClientRect();
            currencyDropdown.style.top = rect.bottom + 5 + 'px';
            currencyDropdown.style.left = rect.left + 'px';
            currencyDropdown.style.display = currencyDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Handle currency option selection
        const currencyOptions = currencyDropdown.querySelectorAll('.currency-option');
        currencyOptions.forEach(option => {
            option.addEventListener('click', function() {
                const currency = this.getAttribute('data-currency');
                paymentMethod = currency;
                currencyDropdown.style.display = 'none';
                
                const sendCryptoDisplay = document.getElementById('sendCryptoDisplay');
                
                if (currency === 'PayPal') {
                    // PayPal selected
                    sendCurrencyText.textContent = 'PayPal';
                    showPayPalInfo();
                    if (sendCryptoDisplay) {
                        sendCryptoDisplay.style.display = 'none';
                    }
                } else if (currency === 'USD') {
                    // USD selected - show crypto selector
                    sendCurrencyText.textContent = 'USD';
                    if (sendCryptoDisplay) {
                        sendCryptoDisplay.style.display = 'flex';
                    }
                } else {
                    // Crypto selected - update display
                    sendCurrencyText.textContent = currency;
                    sendCrypto = currency;
                    
                    // Hide the additional crypto selector since crypto is already selected
                    if (sendCryptoDisplay) {
                        sendCryptoDisplay.style.display = 'none';
                    }
                }
                
                // Update input display based on selection
                const usdSymbol = document.querySelector('.usd-symbol');
                if (currency !== 'USD' && currency !== 'PayPal') {
                    // Show crypto symbol
                    if (usdSymbol) {
                        usdSymbol.textContent = cryptoEmojis[currency] || '';
                    }
                } else {
                    // Show USD symbol
                    if (usdSymbol) {
                        usdSymbol.textContent = '$';
                    }
                }
                
                calculate();
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!sendCurrencySelector.contains(e.target) && !currencyDropdown.contains(e.target)) {
                currencyDropdown.style.display = 'none';
            }
        });
    }
});

// Show PayPal info modal
function showPayPalInfo() {
    const modal = document.getElementById('paypalInfoModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close PayPal info modal
function closePayPalInfo() {
    const modal = document.getElementById('paypalInfoModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Copy PayPal link
function copyPayPalLink() {
    const link = document.getElementById('paypalLink').textContent;
    navigator.clipboard.writeText(link).then(() => {
        event.target.textContent = 'Copied!';
        setTimeout(() => {
            event.target.textContent = 'Copy';
        }, 2000);
    });
}