# 🏆 Tour de France Jersey Tracker - Real-Time Edition

A dynamic web application that displays live Tour de France jersey standings with real-time data integration from multiple cycling APIs.

## ✨ Features

### 🚀 Real-Time Data Integration
- **Live API Integration**: Fetches current standings from multiple cycling data sources
- **Multiple API Sources**: Pro Cycling Stats, UCI, Cycling News, Velon, and Cycling Data APIs
- **Automatic Fallback**: Graceful degradation when APIs are unavailable
- **Smart Caching**: 5-minute cache to reduce API calls and improve performance
- **Real-Time Updates**: Manual refresh button with loading indicators

### 🎯 Current Tour Tracking
- **2025 Tour de France**: Live stage-by-stage data with current standings
- **Jersey Leaders**: Yellow, Green, Polka Dot, and White jersey holders
- **Stage Information**: Detailed stage data including routes, distances, and dates
- **Interactive Maps**: Stage routes displayed using Leaflet.js
- **TBD Handling**: Future stages marked as "To Be Determined"

### 📊 Historical Data
- **Past Tours**: Complete results for 2020-2024 Tours de France
- **Final Winners**: Historical jersey winners with final statistics
- **Year Navigation**: Easy switching between current and historical tours

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Glass Morphism**: Modern visual effects with backdrop blur
- **Smooth Animations**: Fade-in effects and loading indicators
- **Keyboard Navigation**: Arrow keys for stage navigation
- **Accessibility**: Screen reader friendly with proper ARIA labels

## 🛠️ Technical Implementation

### API Integration
The application integrates with multiple cycling data APIs for redundancy and reliability:

#### 1. **Pro Cycling Stats** (Primary - Free)
- **URL**: https://www.procyclingstats.com
- **Features**: General Classification, Points, Mountains, Youth standings
- **Authentication**: None required
- **Rate Limits**: Generous for public use

#### 2. **UCI API** (Official - Requires Key)
- **URL**: https://api.uci.org/v1
- **Features**: Official race results and standings
- **Authentication**: API key required
- **Rate Limits**: Varies by subscription

#### 3. **Cycling News API**
- **URL**: https://www.cyclingnews.com/api
- **Features**: Race standings and stage results
- **Authentication**: None required
- **Rate Limits**: Standard web scraping limits

#### 4. **Velon API** (Team Data)
- **URL**: https://api.velon.cc
- **Features**: Team standings and rider data
- **Authentication**: None required
- **Rate Limits**: Standard web limits

#### 5. **Cycling Data API** (Alternative)
- **URL**: https://api.cyclingdata.com
- **Features**: Comprehensive cycling data
- **Authentication**: API key required
- **Rate Limits**: Varies by plan

### Data Flow
```
User Request → API Manager → Multiple Sources → Data Validation → Cache → Display
     ↓              ↓              ↓              ↓           ↓        ↓
  Fallback → Error Handling → Retry Logic → Parsing → Storage → UI Update
```

### Caching Strategy
- **Cache Duration**: 5 minutes for live data
- **Cache Storage**: Browser localStorage
- **Cache Invalidation**: Manual refresh or timeout
- **Fallback Data**: Minimal data when APIs fail

## 🚀 Setup Instructions

### 1. Basic Setup (No API Keys Required)
```bash
# Clone the repository
git clone <repository-url>
cd tour-de-france-jerseys

# Open in browser
open index.html
```

The application will work immediately with free APIs (Pro Cycling Stats, Cycling News, Velon).

### 2. Enhanced Setup (With API Keys)

#### Step 1: Configure API Keys
Edit `config.js` and add your API keys:

```javascript
// For UCI API
API_CONFIG.UCI.apiKey = 'your-uci-api-key';
API_CONFIG.UCI.enabled = true;

// For Cycling Data API
API_CONFIG.CYCLING_DATA.apiKey = 'your-cycling-data-api-key';
API_CONFIG.CYCLING_DATA.enabled = true;
```

#### Step 2: Get API Keys

**UCI API Key:**
1. Visit https://www.uci.org/api
2. Register for a developer account
3. Request API access
4. Receive your API key

**Cycling Data API Key:**
1. Visit https://api.cyclingdata.com
2. Sign up for an account
3. Choose a subscription plan
4. Get your API key

#### Step 3: Test Configuration
```javascript
// In browser console, test API connectivity
const tracker = new TourDeFranceTracker();
tracker.testAPIConnectivity();
```

### 3. Development Setup

#### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)

#### Local Development Server
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📁 Project Structure

```
tour-de-france-jerseys/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # Main JavaScript application
├── config.js           # API configuration
├── README.md           # This file
└── assets/             # Images and static files
    ├── icons/
    └── images/
```

## 🔧 Configuration Options

### API Settings (`config.js`)

```javascript
const API_CONFIG = {
    // Enable/disable specific APIs
    PRO_CYCLING_STATS: { enabled: true },
    UCI: { enabled: false, apiKey: null },
    CYCLING_NEWS: { enabled: true },
    VELON: { enabled: true },
    CYCLING_DATA: { enabled: false, apiKey: null },

    // Cache settings
    CACHE: {
        timeout: 5 * 60 * 1000, // 5 minutes
        maxSize: 100
    },

    // Request settings
    REQUEST: {
        timeout: 10000, // 10 seconds
        retries: 3,
        retryDelay: 1000
    }
};
```

### Customization Options

#### Change Default Year
```javascript
// In script.js constructor
this.currentYear = 2025; // Change to desired year
```

#### Modify Cache Duration
```javascript
// In config.js
CACHE: {
    timeout: 10 * 60 * 1000, // 10 minutes
    maxSize: 200
}
```

#### Add New API Source
```javascript
// In config.js
NEW_API: {
    baseUrl: 'https://api.example.com',
    endpoints: {
        standings: '/tour-de-france/{year}/standings'
    },
    enabled: true
}
```

## 🌐 Browser Compatibility

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+
- **Mobile**: iOS Safari 13+, Chrome Mobile 80+

## 🔒 Security Considerations

### API Key Management
- API keys are stored in browser localStorage
- Keys are not transmitted to external servers
- Consider using environment variables for production

### CORS and Cross-Origin Requests
- Some APIs may have CORS restrictions
- Consider using a proxy server for production
- Implement proper error handling for blocked requests

### Rate Limiting
- Respect API rate limits
- Implement exponential backoff for retries
- Use caching to minimize API calls

## 🚀 Deployment

### Static Hosting
The application can be deployed to any static hosting service:

- **GitHub Pages**: Free hosting for public repositories
- **Netlify**: Drag and drop deployment
- **Vercel**: Automatic deployment from Git
- **AWS S3**: Static website hosting
- **Firebase Hosting**: Google's hosting solution

### Production Considerations
1. **API Keys**: Use environment variables
2. **CORS**: Set up proxy if needed
3. **Caching**: Implement CDN caching
4. **Monitoring**: Add error tracking
5. **HTTPS**: Ensure secure connections

## 🔄 Data Updates

### Automatic Updates
- Data refreshes every 5 minutes (configurable)
- Manual refresh button available
- Real-time updates during live races

### Manual Updates
To update data manually, edit the fallback data in `script.js`:

```javascript
async loadFallbackData() {
    this.tourData = {
        2025: {
            stages: {
                1: {
                    // Update stage data here
                }
            }
        }
    };
}
```

## 🐛 Troubleshooting

### Common Issues

#### 1. "Failed to load live data"
- Check internet connection
- Verify API endpoints are accessible
- Check browser console for CORS errors
- Try refreshing the page

#### 2. "No data available for selected year"
- Verify the year has data in the API
- Check if historical data is available
- Try switching to a different year

#### 3. Maps not loading
- Ensure Leaflet.js is loaded
- Check if coordinates are available
- Verify internet connection for map tiles

#### 4. API rate limiting
- Wait a few minutes before retrying
- Check API documentation for limits
- Consider upgrading API plan

### Debug Mode
Enable debug logging in browser console:

```javascript
// In browser console
localStorage.setItem('debug', 'true');
location.reload();
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test with multiple API sources
- Ensure responsive design
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Pro Cycling Stats**: For providing free cycling data
- **UCI**: For official race data
- **Cycling News**: For race coverage and data
- **Velon**: For team data
- **Leaflet.js**: For interactive maps
- **Font Awesome**: For icons

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review API documentation
- Test with different browsers

---

**Note**: This application relies on external APIs. Data availability and accuracy depend on the API providers. For official results, always refer to the official Tour de France website. 