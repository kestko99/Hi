// 1:1 Exchange Rate Handler
document.addEventListener('DOMContentLoaded', function() {
    const sendAmountInput = document.getElementById('sendAmount');
    const receiveAmountInput = document.getElementById('receiveAmount');
    const swapButton = document.getElementById('swapButton');
    const sendCurrency = document.getElementById('sendCurrency');
    const receiveCurrency = document.getElementById('receiveCurrency');

    // Currency data
    const currencies = {
        BTC: {
            name: 'Bitcoin',
            icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
        },
        ETH: {
            name: 'Ethereum', 
            icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
        },
        USDT: {
            name: 'Tether',
            icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png'
        },
        BNB: {
            name: 'Binance Coin',
            icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
        }
    };

    // 1:1 Exchange Rate - Update receive amount when send amount changes
    function updateReceiveAmount() {
        const sendValue = parseFloat(sendAmountInput.value) || 0;
        receiveAmountInput.value = sendValue;
    }

    // Handle swap button click
    function handleSwap() {
        // Get current values
        const sendAmount = sendAmountInput.value;
        const receiveAmount = receiveAmountInput.value;
        
        // Get current currency elements
        const sendCurrencyCode = sendCurrency.querySelector('.currency-code').textContent;
        const sendCurrencyIcon = sendCurrency.querySelector('.coin-icon').src;
        const receiveCurrencyCode = receiveCurrency.querySelector('.currency-code').textContent;
        const receiveCurrencyIcon = receiveCurrency.querySelector('.coin-icon').src;
        
        // Swap amounts
        sendAmountInput.value = receiveAmount;
        receiveAmountInput.value = sendAmount;
        
        // Swap currencies
        sendCurrency.querySelector('.currency-code').textContent = receiveCurrencyCode;
        sendCurrency.querySelector('.coin-icon').src = receiveCurrencyIcon;
        receiveCurrency.querySelector('.currency-code').textContent = sendCurrencyCode;
        receiveCurrency.querySelector('.coin-icon').src = sendCurrencyIcon;
        
        // Add animation effect
        swapButton.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            swapButton.style.transform = 'rotate(0deg)';
        }, 300);
    }

    // Handle tab switching
    function handleTabSwitch() {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Handle currency selector clicks (placeholder functionality)
    function handleCurrencySelectors() {
        const currencySelectors = document.querySelectorAll('.currency-selector');
        currencySelectors.forEach(selector => {
            selector.addEventListener('click', function() {
                // Add visual feedback
                this.style.background = 'rgba(255, 255, 255, 0.2)';
                setTimeout(() => {
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 150);
                
                // In a real app, this would open a currency selection modal
                console.log('Currency selector clicked');
            });
        });
    }

    // Handle explore button click
    function handleExploreButton() {
        const exploreButton = document.querySelector('.exchange-button');
        exploreButton.addEventListener('click', function() {
            // Add loading state
            const originalText = this.querySelector('.button-text').textContent;
            this.querySelector('.button-text').textContent = 'Processing...';
            this.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                this.querySelector('.button-text').textContent = originalText;
                this.disabled = false;
                alert('Exchange simulation complete! In a real app, this would initiate the exchange process.');
            }, 2000);
        });
    }

    // Handle cookie acceptance
    function handleCookieAcceptance() {
        const acceptButton = document.querySelector('.accept-button');
        const cookieNotice = document.querySelector('.cookie-notice');
        
        acceptButton.addEventListener('click', function() {
            cookieNotice.style.opacity = '0';
            cookieNotice.style.transform = 'translateY(20px)';
            setTimeout(() => {
                cookieNotice.style.display = 'none';
            }, 300);
        });
    }

    // Validate input to only allow positive numbers
    function validateInput(input) {
        input.addEventListener('input', function() {
            let value = this.value;
            // Remove any non-numeric characters except decimal point
            value = value.replace(/[^0-9.]/g, '');
            
            // Ensure only one decimal point
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
            
            // Limit to 8 decimal places
            if (parts.length === 2 && parts[1].length > 8) {
                value = parts[0] + '.' + parts[1].substring(0, 8);
            }
            
            this.value = value;
            
            // Update receive amount for 1:1 exchange
            if (this === sendAmountInput) {
                updateReceiveAmount();
            }
        });
    }

    // Add smooth animations
    function addAnimations() {
        const exchangeForm = document.querySelector('.exchange-form');
        exchangeForm.style.opacity = '0';
        exchangeForm.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            exchangeForm.style.transition = 'all 0.5s ease';
            exchangeForm.style.opacity = '1';
            exchangeForm.style.transform = 'translateY(0)';
        }, 100);
    }

    // Initialize all functionality
    function init() {
        // Set up event listeners
        sendAmountInput.addEventListener('input', updateReceiveAmount);
        swapButton.addEventListener('click', handleSwap);
        
        // Validate inputs
        validateInput(sendAmountInput);
        
        // Initialize other handlers
        handleTabSwitch();
        handleCurrencySelectors();
        handleExploreButton();
        handleCookieAcceptance();
        addAnimations();
        
        // Set initial state
        updateReceiveAmount();
        
        console.log('Crypto Exchange 1:1 initialized successfully');
    }

    // Start the application
    init();
});

// Utility function to format numbers
function formatNumber(num) {
    if (num === 0) return '0';
    if (num < 0.01) return num.toFixed(8);
    if (num < 1) return num.toFixed(6);
    if (num < 10) return num.toFixed(4);
    return num.toFixed(2);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Enter key on inputs
    if (e.key === 'Enter') {
        const exploreButton = document.querySelector('.exchange-button');
        if (document.activeElement.classList.contains('amount-input')) {
            exploreButton.click();
        }
    }
    
    // Escape key to close modals (future functionality)
    if (e.key === 'Escape') {
        console.log('Escape key pressed');
    }
});