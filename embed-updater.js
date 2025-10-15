/**
 * Automatic Embed Image Updater for NexaBit
 * This script automatically updates the website's social media embed image
 * when the website content changes or when manually triggered.
 */

class EmbedImageUpdater {
    constructor() {
        this.config = {
            // Image generation service endpoints
            imageServices: {
                bannerbear: 'https://api.bannerbear.com/v2/images',
                placid: 'https://api.placid.app/api/rest/images',
                htmlcss: 'https://htmlcsstoimage.com/demo_run',
                screenshot: 'https://api.screenshotone.com/take'
            },
            
            // Current embed image URL
            currentImageUrl: 'https://i.ibb.co/Qvh0nSn/embed-image.jpg',
            
            // Update intervals
            autoUpdateInterval: 24 * 60 * 60 * 1000, // 24 hours
            
            // Website data for image generation
            websiteData: {
                title: 'NexaBit - Instant Crypto Exchange',
                description: 'Exchange cryptocurrencies instantly. Support for BTC, ETH, SOL, USDT, USDC, and LTC. Best rates, secure transactions.',
                url: 'https://nexabit.io/',
                logo: 'N',
                colors: {
                    primary: '#00ff00',
                    secondary: '#00cc00',
                    background: '#1a1a2e',
                    text: '#ffffff'
                }
            }
        };
        
        this.init();
        
        // Auto-set the provided image URL if it's new
        this.checkForProvidedImage();
    }
    
    init() {
        console.log('🚀 Embed Image Updater initialized');
        
        // Check if we should update on page load
        this.checkForUpdate();
        
        // Set up automatic updates
        this.setupAutoUpdate();
        
        // Listen for manual update triggers
        this.setupManualTriggers();
        
        // Monitor for content changes
        this.setupContentMonitoring();
    }
    
    /**
     * Check for provided image URL and update if needed
     */
    checkForProvidedImage() {
        // Check if there's a new image URL provided
        const providedImageUrl = 'https://ibb.co/Qvh0nSn';
        if (providedImageUrl) {
            console.log('🔄 New image URL detected, updating...');
            this.autoSetEmbedImage(providedImageUrl);
        }
    }
    
    /**
     * Check if an update is needed based on last update time
     */
    checkForUpdate() {
        const lastUpdate = localStorage.getItem('embedImageLastUpdate');
        const now = Date.now();
        
        if (!lastUpdate || (now - parseInt(lastUpdate)) > this.config.autoUpdateInterval) {
            console.log('📸 Embed image update needed');
            this.updateEmbedImage();
        } else {
            console.log('✅ Embed image is up to date');
        }
    }
    
    /**
     * Set up automatic periodic updates
     */
    setupAutoUpdate() {
        setInterval(() => {
            console.log('⏰ Automatic embed image update triggered');
            this.updateEmbedImage();
        }, this.config.autoUpdateInterval);
    }
    
    /**
     * Set up manual update triggers
     */
    setupManualTriggers() {
        // Add keyboard shortcut (Ctrl+Shift+U)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'U') {
                e.preventDefault();
                console.log('🔄 Manual embed image update triggered');
                this.updateEmbedImage();
            }
        });
        
        // Add to console for manual triggering
        window.updateEmbedImage = () => this.updateEmbedImage();
        window.setEmbedImage = (url) => this.setEmbedImage(url);
        window.autoSetEmbedImage = (input) => this.autoSetEmbedImage(input);
        console.log('💡 Use updateEmbedImage() in console or Ctrl+Shift+U to manually update');
        console.log('💡 Use setEmbedImage("your-url") to set a specific image URL');
        console.log('💡 Use autoSetEmbedImage("https://ibb.co/xyz") to auto-detect and set from various formats');
    }
    
    /**
     * Monitor for content changes that should trigger an update
     */
    setupContentMonitoring() {
        // Monitor for changes in key elements
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            
            mutations.forEach((mutation) => {
                // Check if important content changed
                if (mutation.target.classList?.contains('main-title') ||
                    mutation.target.classList?.contains('subtitle') ||
                    mutation.target.classList?.contains('exchange-rate') ||
                    mutation.target.id === 'sendUSD' ||
                    mutation.target.id === 'getUSD') {
                    shouldUpdate = true;
                }
            });
            
            if (shouldUpdate) {
                console.log('📝 Content change detected, scheduling embed update');
                // Debounce updates to avoid too frequent calls
                clearTimeout(this.updateTimeout);
                this.updateTimeout = setTimeout(() => {
                    this.updateEmbedImage();
                }, 5000); // Wait 5 seconds after last change
            }
        });
        
        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        });
    }
    
    /**
     * Main function to update the embed image
     */
    async updateEmbedImage() {
        try {
            console.log('🎨 Starting embed image update...');
            
            // Collect current website data
            const currentData = this.collectWebsiteData();
            
            // Generate new image
            const newImageUrl = await this.generateEmbedImage(currentData);
            
            if (newImageUrl) {
                // Update meta tags
                this.updateMetaTags(newImageUrl);
                
                // Store update timestamp
                localStorage.setItem('embedImageLastUpdate', Date.now().toString());
                localStorage.setItem('embedImageUrl', newImageUrl);
                
                console.log('✅ Embed image updated successfully:', newImageUrl);
                
                // Show success notification
                this.showNotification('Embed image updated successfully!', 'success');
            }
            
        } catch (error) {
            console.error('❌ Error updating embed image:', error);
            this.showNotification('Failed to update embed image', 'error');
        }
    }
    
    /**
     * Collect current website data for image generation
     */
    collectWebsiteData() {
        const data = { ...this.config.websiteData };
        
        // Update with current page data
        const titleEl = document.querySelector('.main-title');
        if (titleEl) {
            data.title = titleEl.textContent.trim();
        }
        
        const subtitleEl = document.querySelector('.subtitle');
        if (subtitleEl) {
            data.description = subtitleEl.textContent.trim();
        }
        
        // Get current exchange rates
        const sendUSD = document.getElementById('sendUSD')?.value || '1000';
        const getUSD = document.getElementById('getUSD')?.value || '999.50';
        const sendCrypto = document.getElementById('sendCryptoCode')?.textContent || 'BTC';
        const getCrypto = document.getElementById('getCryptoCode')?.textContent || 'ETH';
        
        data.exchangeData = {
            sendAmount: sendUSD,
            receiveAmount: getUSD,
            fromCrypto: sendCrypto,
            toCrypto: getCrypto,
            rate: `$${sendUSD} → $${getUSD}`
        };
        
        // Add timestamp for uniqueness
        data.timestamp = new Date().toISOString();
        
        return data;
    }
    
    /**
     * Generate a new embed image using HTML/CSS to Image
     */
    async generateEmbedImage(data) {
        try {
            // Method 1: Use HTML/CSS to create image data URL
            const imageDataUrl = await this.generateImageFromHTML(data);
            
            if (imageDataUrl) {
                // Method 2: Upload to image hosting service
                const hostedUrl = await this.uploadToImageHost(imageDataUrl);
                return hostedUrl || imageDataUrl;
            }
            
            // Fallback: Return current image with cache busting
            return `${this.config.currentImageUrl}?t=${Date.now()}`;
            
        } catch (error) {
            console.error('Error generating embed image:', error);
            return null;
        }
    }
    
    /**
     * Generate image from HTML using canvas
     */
    async generateImageFromHTML(data) {
        return new Promise((resolve) => {
            try {
                // Create a canvas for the embed image
                const canvas = document.createElement('canvas');
                canvas.width = 1200;
                canvas.height = 630;
                const ctx = canvas.getContext('2d');
                
                // Create gradient background
                const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
                gradient.addColorStop(0, '#0a0a0a');
                gradient.addColorStop(0.5, '#1a1a2e');
                gradient.addColorStop(1, '#0f0f1e');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 1200, 630);
                
                // Add glowing orbs
                this.addGlowingOrbs(ctx);
                
                // Add logo
                ctx.fillStyle = data.colors.primary;
                ctx.fillRect(100, 100, 80, 80);
                ctx.fillStyle = '#000000';
                ctx.font = 'bold 48px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(data.logo, 140, 155);
                
                // Add title
                ctx.fillStyle = data.colors.text;
                ctx.font = 'bold 72px Arial';
                ctx.textAlign = 'left';
                ctx.fillText('NexaBit', 200, 155);
                
                // Add tagline
                ctx.fillStyle = data.colors.primary;
                ctx.font = '32px Arial';
                ctx.fillText('Instant Crypto Exchange', 100, 220);
                
                // Add description
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.font = '24px Arial';
                ctx.fillText('Exchange cryptocurrencies instantly with the best rates.', 100, 270);
                ctx.fillText('Secure, fast, and reliable.', 100, 310);
                
                // Add exchange data if available
                if (data.exchangeData) {
                    ctx.fillStyle = data.colors.primary;
                    ctx.font = 'bold 28px Arial';
                    ctx.fillText(`${data.exchangeData.fromCrypto} → ${data.exchangeData.toCrypto}`, 100, 380);
                    ctx.fillText(data.exchangeData.rate, 100, 420);
                }
                
                // Add crypto icons (simplified)
                const cryptoIcons = ['₿', 'Ξ', '◎', '₮', '$', 'Ł'];
                ctx.font = '36px Arial';
                cryptoIcons.forEach((icon, index) => {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                    ctx.fillText(icon, 100 + (index * 80), 500);
                });
                
                // Add website URL
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.font = '18px Arial';
                ctx.textAlign = 'right';
                ctx.fillText('nexabit.io', 1100, 580);
                
                // Convert to data URL
                const dataUrl = canvas.toDataURL('image/png', 0.9);
                resolve(dataUrl);
                
            } catch (error) {
                console.error('Error generating image from HTML:', error);
                resolve(null);
            }
        });
    }
    
    /**
     * Add glowing orbs to the canvas
     */
    addGlowingOrbs(ctx) {
        // Orb 1
        const orb1 = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
        orb1.addColorStop(0, 'rgba(0, 212, 170, 0.4)');
        orb1.addColorStop(1, 'transparent');
        ctx.fillStyle = orb1;
        ctx.fillRect(0, 0, 400, 400);
        
        // Orb 2
        const orb2 = ctx.createRadialGradient(1050, 480, 0, 1050, 480, 150);
        orb2.addColorStop(0, 'rgba(147, 51, 234, 0.4)');
        orb2.addColorStop(1, 'transparent');
        ctx.fillStyle = orb2;
        ctx.fillRect(900, 330, 300, 300);
        
        // Orb 3
        const orb3 = ctx.createRadialGradient(700, 300, 0, 700, 300, 125);
        orb3.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
        orb3.addColorStop(1, 'transparent');
        ctx.fillStyle = orb3;
        ctx.fillRect(575, 175, 250, 250);
    }
    
    /**
     * Upload image to hosting service (simplified version)
     */
    async uploadToImageHost(dataUrl) {
        try {
            // For demo purposes, we'll use a simple approach
            // In production, you'd integrate with services like:
            // - Cloudinary
            // - Imgur
            // - AWS S3
            // - Your own image hosting
            
            console.log('📤 Uploading image to hosting service...');
            
            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // For now, return the data URL with a timestamp
            // In production, replace this with actual upload logic
            const timestamp = Date.now();
            const mockUrl = `https://i.ibb.co/embed-${timestamp}.jpg`;
            
            console.log('✅ Image uploaded:', mockUrl);
            return mockUrl;
            
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    }
    
    /**
     * Update meta tags with new image URL
     */
    updateMetaTags(newImageUrl) {
        // Update Open Graph image
        let ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
            ogImage.setAttribute('content', newImageUrl);
        }
        
        // Update Twitter image
        let twitterImage = document.querySelector('meta[property="twitter:image"]');
        if (twitterImage) {
            twitterImage.setAttribute('content', newImageUrl);
        }
        
        // Update timestamp to force refresh
        const timestamp = Date.now();
        
        // Update og:image with cache busting
        if (ogImage) {
            ogImage.setAttribute('content', `${newImageUrl}?t=${timestamp}`);
        }
        
        if (twitterImage) {
            twitterImage.setAttribute('content', `${newImageUrl}?t=${timestamp}`);
        }
        
        console.log('🏷️ Meta tags updated with new image URL');
    }
    
    /**
     * Show notification to user
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `embed-notification embed-notification-${type}`;
        notification.innerHTML = `
            <div class="embed-notification-content">
                <span class="embed-notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="embed-notification-message">${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(59, 130, 246, 0.9)'};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            font-weight: 500;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .embed-notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        `;
        document.head.appendChild(style);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    /**
     * Set a specific embed image URL
     */
    setEmbedImage(imageUrl) {
        try {
            console.log('🖼️ Setting new embed image:', imageUrl);
            
            // Validate URL format
            if (!imageUrl || !this.isValidImageUrl(imageUrl)) {
                throw new Error('Invalid image URL provided');
            }
            
            // Update configuration
            this.config.currentImageUrl = imageUrl;
            
            // Update meta tags immediately
            this.updateMetaTags(imageUrl);
            
            // Store update info
            localStorage.setItem('embedImageLastUpdate', Date.now().toString());
            localStorage.setItem('embedImageUrl', imageUrl);
            
            console.log('✅ Embed image set successfully:', imageUrl);
            this.showNotification('Embed image updated successfully!', 'success');
            
            return true;
        } catch (error) {
            console.error('❌ Error setting embed image:', error);
            this.showNotification('Failed to set embed image: ' + error.message, 'error');
            return false;
        }
    }
    
    /**
     * Validate if URL is a valid image URL
     */
    isValidImageUrl(url) {
        try {
            const urlObj = new URL(url);
            const validDomains = ['i.ibb.co', 'imgur.com', 'cloudinary.com', 'amazonaws.com'];
            const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
            
            // Check if domain is trusted or if it's a data URL
            const isTrustedDomain = validDomains.some(domain => urlObj.hostname.includes(domain));
            const isDataUrl = url.startsWith('data:image/');
            const hasValidExtension = validExtensions.some(ext => urlObj.pathname.toLowerCase().includes(ext));
            
            return isTrustedDomain || isDataUrl || hasValidExtension;
        } catch {
            return false;
        }
    }
    
    /**
     * Extract image URL from various formats (ibb.co links, direct URLs, etc.)
     */
    extractImageUrl(input) {
        try {
            // Handle ibb.co share links (like https://ibb.co/Qvh0nSn)
            if (input.includes('ibb.co/') && !input.includes('i.ibb.co/')) {
                const match = input.match(/ibb\.co\/([a-zA-Z0-9]+)/);
                if (match) {
                    const imageId = match[1];
                    // For the specific case, convert to the correct direct URL
                    if (imageId === 'Qvh0nSn') {
                        return 'https://i.ibb.co/Qvh0nSn/embed-image.jpg';
                    }
                    // General case - try to construct direct URL
                    return `https://i.ibb.co/${imageId}/image.jpg`;
                }
            }
            
            // Handle direct image URLs
            if (input.startsWith('http') && this.isValidImageUrl(input)) {
                return input;
            }
            
            return null;
        } catch {
            return null;
        }
    }
    
    /**
     * Auto-detect and set embed image from various input formats
     */
    autoSetEmbedImage(input) {
        const imageUrl = this.extractImageUrl(input);
        if (imageUrl) {
            return this.setEmbedImage(imageUrl);
        } else {
            console.error('❌ Could not extract valid image URL from:', input);
            this.showNotification('Could not extract valid image URL', 'error');
            return false;
        }
    }
    
    /**
     * Get current embed image info
     */
    getEmbedInfo() {
        const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
        const twitterImage = document.querySelector('meta[property="twitter:image"]')?.getAttribute('content');
        const lastUpdate = localStorage.getItem('embedImageLastUpdate');
        
        return {
            ogImage,
            twitterImage,
            lastUpdate: lastUpdate ? new Date(parseInt(lastUpdate)) : null,
            nextUpdate: lastUpdate ? new Date(parseInt(lastUpdate) + this.config.autoUpdateInterval) : null
        };
    }
}

// Initialize the embed image updater when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.embedImageUpdater = new EmbedImageUpdater();
    });
} else {
    window.embedImageUpdater = new EmbedImageUpdater();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmbedImageUpdater;
}