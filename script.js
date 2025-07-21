// Exchange rate (1 BTC = 30.78897 ETH)
const EXCHANGE_RATE = 30.78897;

// Get DOM elements
const sendAmountInput = document.getElementById('sendAmount');
const getAmountInput = document.getElementById('getAmount');
const refreshBtn = document.querySelector('.refresh-btn');
const acceptBtn = document.querySelector('.accept-btn');
const cookieNotice = document.querySelector('.cookie-notice');
const tabs = document.querySelectorAll('.tab');

// Calculate exchange amount
function calculateExchange() {
    const sendAmount = parseFloat(sendAmountInput.value) || 0;
    const getAmount = sendAmount * EXCHANGE_RATE;
    getAmountInput.value = getAmount.toFixed(7);
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