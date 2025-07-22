// Tour de France Jersey Tracker - API Configuration
// Configure your API keys and endpoints here

const API_CONFIG = {
    // Pro Cycling Stats (Free - no API key required)
    PRO_CYCLING_STATS: {
        baseUrl: 'https://www.procyclingstats.com',
        endpoints: {
            gc: '/race/tour-de-france/{year}/gc',
            points: '/race/tour-de-france/{year}/points',
            mountains: '/race/tour-de-france/{year}/mountains',
            youth: '/race/tour-de-france/{year}/youth'
        },
        enabled: true
    },

    // UCI API (Requires authentication)
    UCI: {
        baseUrl: 'https://api.uci.org/v1',
        endpoints: {
            events: '/events/tour-de-france/{year}/results',
            standings: '/events/tour-de-france/{year}/standings'
        },
        apiKey: null, // Set your UCI API key here
        enabled: false // Set to true if you have an API key
    },

    // Cycling News API
    CYCLING_NEWS: {
        baseUrl: 'https://www.cyclingnews.com/api',
        endpoints: {
            standings: '/tour-de-france/{year}/standings',
            stage: '/tour-de-france/{year}/stage/{stage}'
        },
        enabled: true
    },

    // Velon API (Team data)
    VELON: {
        baseUrl: 'https://api.velon.cc',
        endpoints: {
            events: '/events/tour-de-france/{year}/standings',
            teams: '/events/tour-de-france/{year}/teams'
        },
        enabled: true
    },

    // Alternative: Cycling Data API
    CYCLING_DATA: {
        baseUrl: 'https://api.cyclingdata.com',
        endpoints: {
            tour: '/tour-de-france/{year}',
            stage: '/tour-de-france/{year}/stage/{stage}'
        },
        apiKey: null, // Set your Cycling Data API key here
        enabled: false
    },

    // Cache settings
    CACHE: {
        timeout: 5 * 60 * 1000, // 5 minutes
        maxSize: 100 // Maximum number of cached items
    },

    // Request settings
    REQUEST: {
        timeout: 10000, // 10 seconds
        retries: 3,
        retryDelay: 1000 // 1 second
    }
};

// API Key Management
class APIKeyManager {
    constructor() {
        this.keys = this.loadKeys();
    }

    loadKeys() {
        // Try to load from localStorage first
        const stored = localStorage.getItem('tourDeFranceAPIKeys');
        if (stored) {
            return JSON.parse(stored);
        }

        // Default keys (set these if you have them)
        return {
            UCI: null,
            CYCLING_DATA: null
        };
    }

    saveKeys() {
        localStorage.setItem('tourDeFranceAPIKeys', JSON.stringify(this.keys));
    }

    setKey(service, key) {
        this.keys[service] = key;
        this.saveKeys();
    }

    getKey(service) {
        return this.keys[service];
    }

    hasKey(service) {
        return !!this.keys[service];
    }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, APIKeyManager };
} 