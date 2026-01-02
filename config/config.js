// Configuration file for API keys and settings
// IMPORTANT: Replace these with your actual Google API credentials
// For production, consider using environment variables or a secure backend

const CONFIG = {
    // Google Calendar API Configuration
    GOOGLE_CLIENT_ID: '451654051336-h21abrdcjplm66819ovcktbu282noetl.apps.googleusercontent.com',
    GOOGLE_API_KEY: 'AIzaSyBXEAqcfPF9BJcrhnRGIfnh6TidFpfhj0w',
    
    // Google Calendar API Scopes
    SCOPES: 'https://www.googleapis.com/auth/calendar',
    
    // Calendar ID (usually 'primary' for personal calendar, or your calendar ID)
    CALENDAR_ID: 'primary',
    
    // Timezone
    TIMEZONE: 'Europe/Belgrade'
};

// Make config available globally
window.CONFIG = CONFIG;
