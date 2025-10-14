// Crypto prices and data (Updated October 2024 - Current Market Rates)
const prices = {
    BTC: 67420,   // ~$67,420
    ETH: 2650,    // ~$2,650
    SOL: 158,     // ~$158
    USDT: 1,      // $1 (stablecoin)
    USDC: 1,      // $1 (stablecoin)
    LTC: 68,      // ~$68
    THETA: 1.42,  // ~$1.42
    XMR: 162,     // ~$162 (Monero)
    ADA: 0.37,    // ~$0.37 (Cardano)
    DOT: 4.12,    // ~$4.12 (Polkadot)
    AVAX: 24.8,   // ~$24.80 (Avalanche)
    MATIC: 0.42,  // ~$0.42 (Polygon)
    LINK: 11.85,  // ~$11.85 (Chainlink)
    UNI: 7.23,    // ~$7.23 (Uniswap)
    ATOM: 4.67,   // ~$4.67 (Cosmos)
    FTM: 0.68,    // ~$0.68 (Fantom)
    ALGO: 0.14,   // ~$0.14 (Algorand)
    VET: 0.025,   // ~$0.025 (VeChain)
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
    ADA: 'addr1qxy2lpan99fcnhhhy8hefu83xkrawc9xgqhz8gwcu4ljj6w8p4xxk4ld0n7csxeme96kz9bs0nq14t0v8sy2nk',
    DOT: '15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5',
    AVAX: 'X-avax1qqq5h2p8v3z4uf9gf5t3xt9xwl2h5n9x8',
    MATIC: '0x2b2f96e5C5a9c8cb5c73f7b8b8f7c8a9d1e2f3g4',
    LINK: '0x3c3g07f6D6b0d9db6d74g8c9e9g8h7i6j5k4l3m2',
    UNI: '0x4d4h18g7E7c1e0ec7e85h9d0f0h9i8j7k6l5m4n3',
    ATOM: 'cosmos1xyz123abc456def789ghi012jkl345mno678pqr',
    FTM: '0x5e5i29h8F8d2f1fd8f96i0e1g1i0j9k8l7m6n5o4',
    ALGO: 'ALGO456DEF789GHI012JKL345MNO678PQR901STU234',
    VET: '0x6f6j30i9G9e3g2ge9g07j1f2h2j1k0l9m8n7o6p5',
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
    ADA: '₳',
    DOT: '●',
    AVAX: '🔺',
    MATIC: '⬟',
    LINK: '🔗',
    UNI: '🦄',
    ATOM: '⚛',
    FTM: '👻',
    ALGO: '△',
    VET: '⚡',
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
let recentTransactions = [
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

// Popular trading pairs for random generation (expanded list)
const popularTradingPairs = [
    // Major pairs - BTC
    ['BTC', 'ETH'], ['ETH', 'BTC'],
    ['BTC', 'USDT'], ['USDT', 'BTC'],
    ['BTC', 'USDC'], ['USDC', 'BTC'],
    ['BTC', 'SOL'], ['SOL', 'BTC'],
    ['BTC', 'LTC'], ['LTC', 'BTC'],
    ['BTC', 'ADA'], ['ADA', 'BTC'],
    ['BTC', 'DOT'], ['DOT', 'BTC'],
    ['BTC', 'AVAX'], ['AVAX', 'BTC'],
    ['BTC', 'MATIC'], ['MATIC', 'BTC'],
    ['BTC', 'LINK'], ['LINK', 'BTC'],
    ['BTC', 'UNI'], ['UNI', 'BTC'],
    ['BTC', 'ATOM'], ['ATOM', 'BTC'],
    ['BTC', 'XMR'], ['XMR', 'BTC'],
    ['BTC', 'THETA'], ['THETA', 'BTC'],
    
    // Major pairs - ETH
    ['ETH', 'SOL'], ['SOL', 'ETH'],
    ['ETH', 'USDT'], ['USDT', 'ETH'],
    ['ETH', 'USDC'], ['USDC', 'ETH'],
    ['ETH', 'LTC'], ['LTC', 'ETH'],
    ['ETH', 'ADA'], ['ADA', 'ETH'],
    ['ETH', 'DOT'], ['DOT', 'ETH'],
    ['ETH', 'AVAX'], ['AVAX', 'ETH'],
    ['ETH', 'MATIC'], ['MATIC', 'ETH'],
    ['ETH', 'LINK'], ['LINK', 'ETH'],
    ['ETH', 'UNI'], ['UNI', 'ETH'],
    ['ETH', 'ATOM'], ['ATOM', 'ETH'],
    ['ETH', 'XMR'], ['XMR', 'ETH'],
    ['ETH', 'THETA'], ['THETA', 'ETH'],
    ['ETH', 'FTM'], ['FTM', 'ETH'],
    ['ETH', 'ALGO'], ['ALGO', 'ETH'],
    ['ETH', 'VET'], ['VET', 'ETH'],
    
    // SOL pairs
    ['SOL', 'USDC'], ['USDC', 'SOL'],
    ['SOL', 'USDT'], ['USDT', 'SOL'],
    ['SOL', 'ADA'], ['ADA', 'SOL'],
    ['SOL', 'DOT'], ['DOT', 'SOL'],
    ['SOL', 'AVAX'], ['AVAX', 'SOL'],
    ['SOL', 'MATIC'], ['MATIC', 'SOL'],
    ['SOL', 'ATOM'], ['ATOM', 'SOL'],
    ['SOL', 'LINK'], ['LINK', 'SOL'],
    
    // LTC pairs
    ['LTC', 'USDT'], ['USDT', 'LTC'],
    ['LTC', 'USDC'], ['USDC', 'LTC'],
    ['LTC', 'ADA'], ['ADA', 'LTC'],
    ['LTC', 'DOT'], ['DOT', 'LTC'],
    ['LTC', 'XMR'], ['XMR', 'LTC'],
    ['LTC', 'THETA'], ['THETA', 'LTC'],
    
    // ADA pairs
    ['ADA', 'USDT'], ['USDT', 'ADA'],
    ['ADA', 'USDC'], ['USDC', 'ADA'],
    ['ADA', 'DOT'], ['DOT', 'ADA'],
    ['ADA', 'AVAX'], ['AVAX', 'ADA'],
    ['ADA', 'MATIC'], ['MATIC', 'ADA'],
    ['ADA', 'ATOM'], ['ATOM', 'ADA'],
    
    // DOT pairs
    ['DOT', 'USDT'], ['USDT', 'DOT'],
    ['DOT', 'USDC'], ['USDC', 'DOT'],
    ['DOT', 'AVAX'], ['AVAX', 'DOT'],
    ['DOT', 'MATIC'], ['MATIC', 'DOT'],
    ['DOT', 'LINK'], ['LINK', 'DOT'],
    ['DOT', 'ATOM'], ['ATOM', 'DOT'],
    
    // AVAX pairs
    ['AVAX', 'USDT'], ['USDT', 'AVAX'],
    ['AVAX', 'USDC'], ['USDC', 'AVAX'],
    ['AVAX', 'MATIC'], ['MATIC', 'AVAX'],
    ['AVAX', 'UNI'], ['UNI', 'AVAX'],
    ['AVAX', 'ATOM'], ['ATOM', 'AVAX'],
    
    // MATIC pairs
    ['MATIC', 'USDT'], ['USDT', 'MATIC'],
    ['MATIC', 'USDC'], ['USDC', 'MATIC'],
    ['MATIC', 'LINK'], ['LINK', 'MATIC'],
    ['MATIC', 'UNI'], ['UNI', 'MATIC'],
    ['MATIC', 'FTM'], ['FTM', 'MATIC'],
    
    // LINK pairs
    ['LINK', 'USDT'], ['USDT', 'LINK'],
    ['LINK', 'USDC'], ['USDC', 'LINK'],
    ['LINK', 'UNI'], ['UNI', 'LINK'],
    ['LINK', 'ATOM'], ['ATOM', 'LINK'],
    ['LINK', 'THETA'], ['THETA', 'LINK'],
    
    // UNI pairs
    ['UNI', 'USDT'], ['USDT', 'UNI'],
    ['UNI', 'USDC'], ['USDC', 'UNI'],
    ['UNI', 'ATOM'], ['ATOM', 'UNI'],
    
    // ATOM pairs
    ['ATOM', 'USDT'], ['USDT', 'ATOM'],
    ['ATOM', 'USDC'], ['USDC', 'ATOM'],
    ['ATOM', 'FTM'], ['FTM', 'ATOM'],
    
    // XMR pairs
    ['XMR', 'USDT'], ['USDT', 'XMR'],
    ['XMR', 'USDC'], ['USDC', 'XMR'],
    
    // THETA pairs
    ['THETA', 'USDT'], ['USDT', 'THETA'],
    ['THETA', 'USDC'], ['USDC', 'THETA'],
    
    // FTM pairs
    ['FTM', 'USDT'], ['USDT', 'FTM'],
    ['FTM', 'USDC'], ['USDC', 'FTM'],
    ['FTM', 'ALGO'], ['ALGO', 'FTM'],
    
    // ALGO pairs
    ['ALGO', 'USDT'], ['USDT', 'ALGO'],
    ['ALGO', 'USDC'], ['USDC', 'ALGO'],
    ['ALGO', 'VET'], ['VET', 'ALGO'],
    
    // VET pairs
    ['VET', 'USDT'], ['USDT', 'VET'],
    ['VET', 'USDC'], ['USDC', 'VET']
];

// Generate random transaction ID
function generateTxId() {
    return 'tx_' + Math.random().toString(36).substr(2, 9);
}

// Generate random transaction hash
function generateTxHash() {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 32; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
}

// Generate realistic transaction amounts with more randomization
function generateTransactionAmounts(fromCrypto, toCrypto) {
    const fromPrice = prices[fromCrypto];
    const toPrice = prices[toCrypto];
    
    // Define transaction size categories with different probability weights
    const transactionTypes = [
        { name: 'micro', range: [10, 100], weight: 30 },      // Small retail trades
        { name: 'small', range: [100, 500], weight: 25 },     // Regular retail
        { name: 'medium', range: [500, 2000], weight: 20 },   // Serious traders
        { name: 'large', range: [2000, 10000], weight: 15 },  // High volume
        { name: 'whale', range: [10000, 50000], weight: 7 },  // Whale trades
        { name: 'mega', range: [50000, 200000], weight: 3 }   // Institutional
    ];
    
    // Weighted random selection of transaction type
    const totalWeight = transactionTypes.reduce((sum, type) => sum + type.weight, 0);
    let randomWeight = Math.random() * totalWeight;
    let selectedType = transactionTypes[0];
    
    for (const type of transactionTypes) {
        randomWeight -= type.weight;
        if (randomWeight <= 0) {
            selectedType = type;
            break;
        }
    }
    
    // Generate random USD value within the selected range
    const [minUsd, maxUsd] = selectedType.range;
    const usdValue = Math.random() * (maxUsd - minUsd) + minUsd;
    
    // Add some randomness to the exchange rate (±2% variation)
    const rateVariation = 0.98 + (Math.random() * 0.04); // 0.98 to 1.02
    const effectiveToPrice = toPrice * rateVariation;
    
    // Calculate amounts with 0.3-0.8% random fee
    const feePercent = 0.003 + (Math.random() * 0.005); // 0.3% to 0.8%
    const fromAmount = usdValue / fromPrice;
    const toAmount = (usdValue * (1 - feePercent)) / effectiveToPrice;
    
    // Format amounts based on crypto type and value
    const formatAmount = (amount, crypto) => {
        if (['USDT', 'USDC'].includes(crypto)) {
            return Math.round(amount * 100) / 100; // 2 decimal places for stablecoins
        } else if (['BTC'].includes(crypto)) {
            if (amount < 0.001) {
                return Math.round(amount * 100000000) / 100000000; // 8 decimals for small BTC amounts
            } else {
                return Math.round(amount * 100000) / 100000; // 5 decimals for larger BTC amounts
            }
        } else if (['ETH'].includes(crypto)) {
            if (amount < 0.01) {
                return Math.round(amount * 1000000) / 1000000; // 6 decimals for small ETH amounts
            } else {
                return Math.round(amount * 10000) / 10000; // 4 decimals for larger ETH amounts
            }
        } else if (['SOL', 'DOT', 'AVAX', 'LINK', 'UNI', 'ATOM'].includes(crypto)) {
            if (amount < 1) {
                return Math.round(amount * 1000000) / 1000000; // 6 decimals for small amounts
            } else {
                return Math.round(amount * 1000) / 1000; // 3 decimals for larger amounts
            }
        } else if (['THETA', 'ADA', 'MATIC', 'FTM', 'ALGO', 'VET'].includes(crypto)) {
            if (amount < 10) {
                return Math.round(amount * 100000) / 100000; // 5 decimals for small amounts
            } else {
                return Math.round(amount * 100) / 100; // 2 decimals for larger amounts
            }
        } else {
            // Default formatting for other cryptos
            if (amount < 1) {
                return Math.round(amount * 1000000) / 1000000; // 6 decimals
            } else {
                return Math.round(amount * 1000) / 1000; // 3 decimals
            }
        }
    };
    
    return {
        fromAmount: formatAmount(fromAmount, fromCrypto),
        toAmount: formatAmount(toAmount, toCrypto),
        usdValue: Math.round(usdValue),
        transactionType: selectedType.name,
        fee: (feePercent * 100).toFixed(2) + '%'
    };
}

// Generate random transaction status
function generateRandomStatus() {
    const statuses = ['completed', 'pending', 'completed', 'completed']; // Higher chance of completed
    return statuses[Math.floor(Math.random() * statuses.length)];
}

// Generate a new random transaction
function generateRandomTransaction() {
    const randomPair = popularTradingPairs[Math.floor(Math.random() * popularTradingPairs.length)];
    const [fromCrypto, toCrypto] = randomPair;
    const amounts = generateTransactionAmounts(fromCrypto, toCrypto);
    
    const newTransaction = {
        id: generateTxId(),
        fromCrypto,
        toCrypto,
        fromAmount: amounts.fromAmount,
        toAmount: amounts.toAmount,
        usdValue: amounts.usdValue,
        transactionType: amounts.transactionType,
        fee: amounts.fee,
        status: generateRandomStatus(),
        timestamp: new Date(),
        txHash: generateTxHash()
    };
    
    // Add to beginning of array and keep only last 20 transactions
    recentTransactions.unshift(newTransaction);
    if (recentTransactions.length > 20) {
        recentTransactions = recentTransactions.slice(0, 20);
    }
    
    return newTransaction;
}

// Start random transaction generator
let transactionInterval;

function startRandomTransactionGenerator() {
    transactionInterval = setInterval(() => {
        const newTx = generateRandomTransaction();
        
        // Enhanced console logging with transaction details
        const sizeEmoji = {
            'micro': '🔸',
            'small': '🔹',
            'medium': '💎', 
            'large': '🚀',
            'whale': '🐋',
            'mega': '🏛️'
        };
        
        console.log(`${sizeEmoji[newTx.transactionType] || '💰'} New ${newTx.transactionType} transaction: ${newTx.fromCrypto} → ${newTx.toCrypto} | $${newTx.usdValue.toLocaleString()} | Fee: ${newTx.fee}`);
        
        // Re-render transactions with animation
        renderTransactionsWithAnimation();
    }, 5000); // Every 5 seconds
}

function stopRandomTransactionGenerator() {
    if (transactionInterval) {
        clearInterval(transactionInterval);
    }
}

// Mock Trustpilot reviews data
const trustpilotReviews = [
    {
        id: 'review_001',
        name: 'Michael Chen',
        avatar: 'MC',
        rating: 5,
        date: '2 days ago',
        title: 'Excellent crypto exchange platform',
        review: 'Fast transactions and competitive rates. I\'ve been using NexaBit for 6 months now and never had any issues. The interface is clean and easy to use.',
        verified: true
    },
    {
        id: 'review_002', 
        name: 'Sarah Martinez',
        avatar: 'SM',
        rating: 4,
        date: '1 week ago',
        title: 'Great service, quick support',
        review: 'Really impressed with the customer support team. Had an issue with a BTC transfer and they resolved it within hours. Rates are fair too.',
        verified: true
    },
    {
        id: 'review_003',
        name: 'James Wilson',
        avatar: 'JW', 
        rating: 5,
        date: '3 days ago',
        title: 'Best rates I\'ve found',
        review: 'Compared several exchanges and NexaBit consistently offers the best conversion rates. The fee structure is transparent and reasonable.',
        verified: true
    },
    {
        id: 'review_004',
        name: 'Emma Thompson',
        avatar: 'ET',
        rating: 4,
        date: '5 days ago',
        title: 'Smooth experience overall',
        review: 'User-friendly platform with quick exchanges. Only minor complaint is that some altcoins could have better liquidity, but major coins work perfectly.',
        verified: true
    },
    {
        id: 'review_005',
        name: 'David Kumar',
        avatar: 'DK',
        rating: 5,
        date: '1 week ago', 
        title: 'Reliable and trustworthy',
        review: 'Been trading crypto for years and NexaBit is now my go-to exchange. Fast KYC process, secure wallets, and excellent uptime. Highly recommended!',
        verified: true
    },
    {
        id: 'review_006',
        name: 'Lisa Park',
        avatar: 'LP',
        rating: 4,
        date: '4 days ago',
        title: 'Great for beginners',
        review: 'Perfect platform for crypto newcomers. The interface is intuitive and the educational resources helped me understand the basics. Good job!',
        verified: true
    }
];

// Function to render Trustpilot reviews
function renderTrustpilotReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;
    
    // Show 3 random reviews
    const randomReviews = trustpilotReviews
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    const reviewsHTML = randomReviews.map(review => {
        const stars = Array(5).fill(0).map((_, index) => {
            return index < review.rating 
                ? '<span class="star filled">★</span>'
                : '<span class="star empty">★</span>';
        }).join('');
        
        return `
            <div class="review-item">
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">${review.avatar}</div>
                        <div class="reviewer-details">
                            <div class="reviewer-name">
                                ${review.name}
                                ${review.verified ? '<span class="verified-badge">✓</span>' : ''}
                            </div>
                            <div class="review-date">${review.date}</div>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${stars}
                    </div>
                </div>
                <div class="review-content">
                    <h4 class="review-title">${review.title}</h4>
                    <p class="review-text">${review.review}</p>
                </div>
            </div>
        `;
    }).join('');
    
    reviewsContainer.innerHTML = reviewsHTML;
}

// Function to rotate reviews periodically
function startReviewRotation() {
    setInterval(() => {
        renderTrustpilotReviews();
    }, 15000); // Rotate reviews every 15 seconds
}

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

// Function to render transactions with animation
function renderTransactionsWithAnimation() {
    const transactionsList = document.getElementById('transactionsList');
    if (!transactionsList) return;
    
    // Add fade-out animation to existing transactions
    const existingItems = transactionsList.querySelectorAll('.transaction-item');
    existingItems.forEach(item => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '0.7';
        item.style.transform = 'translateX(-10px)';
    });
    
    // Render new transactions after animation
    setTimeout(() => {
        renderTransactions();
        
        // Add fade-in animation to new transactions
        const newItems = transactionsList.querySelectorAll('.transaction-item');
        newItems.forEach((item, index) => {
            if (index === 0) {
                // Highlight the newest transaction
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
                item.style.animation = 'newTransaction 0.6s ease-out forwards';
            } else {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    }, 150);
}

// Function to render transactions
function renderTransactions() {
    const transactionsList = document.getElementById('transactionsList');
    if (!transactionsList) return;
    
    const transactionsHTML = recentTransactions.slice(0, 3).map((tx, index) => {
        const statusClass = tx.status === 'completed' ? 'completed' : 
                           tx.status === 'pending' ? 'pending' : 'failed';
        
        const isNew = index === 0 && tx.timestamp > new Date(Date.now() - 10000); // New if less than 10 seconds old
        
        // Add size indicator for transaction types
        const sizeClass = tx.transactionType ? `transaction-${tx.transactionType}` : '';
        const sizeEmoji = {
            'micro': '🔸',
            'small': '🔹', 
            'medium': '💎',
            'large': '🚀',
            'whale': '🐋',
            'mega': '🏛️'
        };
        
        return `
            <div class="transaction-item ${isNew ? 'new-transaction' : ''} ${sizeClass}" data-tx-id="${tx.id}">
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
                        ${tx.transactionType ? `<span class="transaction-size" title="${tx.transactionType} transaction">${sizeEmoji[tx.transactionType] || ''}</span>` : ''}
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
    
    // Render Trustpilot reviews
    renderTrustpilotReviews();
    
    // Start review rotation
    startReviewRotation();
    
    // Start random transaction generator
    startRandomTransactionGenerator();
    
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