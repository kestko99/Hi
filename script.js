// Exchange rates
const EXCHANGE_RATE = 30.78897; // 1 BTC = 30.78897 ETH
const BTC_TO_USD = 95000; // 1 BTC = $95,000
const ETH_TO_USD = 3070; // 1 ETH = $3,070

// Get DOM elements
const sendAmountInput = document.getElementById('sendAmount');
const getAmountInput = document.getElementById('getAmount');
const sendUSDElement = document.getElementById('sendUSD');
const getUSDElement = document.getElementById('getUSD');
const refreshBtn = document.querySelector('.refresh-btn');
const acceptBtn = document.querySelector('.accept-btn');
const cookieNotice = document.querySelector('.cookie-notice');
const tabs = document.querySelectorAll('.tab');

// Format USD with commas
function formatUSD(amount) {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Calculate exchange amount and USD values
function calculateExchange() {
    const sendAmount = parseFloat(sendAmountInput.value) || 0;
    const getAmount = sendAmount * EXCHANGE_RATE;
    
    // Update crypto amounts
    getAmountInput.value = getAmount.toFixed(7);
    
    // Calculate and update USD values
    const sendUSD = sendAmount * BTC_TO_USD;
    const getUSD = getAmount * ETH_TO_USD;
    
    sendUSDElement.textContent = formatUSD(sendUSD);
    getUSDElement.textContent = formatUSD(getUSD);
}

// Event listeners
sendAmountInput.addEventListener('input', calculateExchange);

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