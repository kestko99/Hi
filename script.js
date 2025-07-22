// Exchange rates
const EXCHANGE_RATE = 30.78897; // 1 BTC = 30.78897 ETH
const BTC_TO_USD = 95000; // 1 BTC = $95,000
const ETH_TO_USD = 3070; // 1 ETH = $3,070

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
    const sendBTC = sendUSD / BTC_TO_USD;
    const getETH = sendBTC * EXCHANGE_RATE;
    const getUSD = getETH * ETH_TO_USD;
    
    // Update crypto displays
    sendCryptoElement.textContent = sendBTC.toFixed(8);
    getCryptoElement.textContent = getETH.toFixed(8);
    
    // Update receive USD
    getUSDInput.value = formatNumber(getUSD);
    
    // Update button amount
    btnAmount.textContent = `$${formatNumber(sendUSD)} → $${formatNumber(getUSD)}`;
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

// Exchange button
document.querySelector('.exchange-btn').addEventListener('click', function() {
    // In a real app, this would proceed to the exchange process
    console.log('Exchange initiated');
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

// Initialize
calculateExchange();