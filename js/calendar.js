// Google Calendar API Integration
// Handles OAuth authentication and event creation

let gapiInitialized = false;
let gisInitialized = false;
let tokenClient = null;

// Initialize Google API
function initializeGapi() {
    if (!window.CONFIG || !window.CONFIG.GOOGLE_CLIENT_ID) {
        console.error('Google API configuration not found. Please update config/config.js');
        return;
    }

    gapi.load('client', async () => {
        try {
            await gapi.client.init({
                apiKey: window.CONFIG.GOOGLE_API_KEY,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            });
            gapiInitialized = true;
            console.log('Google API initialized');
        } catch (error) {
            console.error('Error initializing Google API:', error);
        }
    });
}

// Initialize Google Identity Services
function initializeGis() {
    if (!window.CONFIG || !window.CONFIG.GOOGLE_CLIENT_ID) {
        console.error('Google API configuration not found. Please update config/config.js');
        return;
    }

    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: window.CONFIG.GOOGLE_CLIENT_ID,
        scope: window.CONFIG.SCOPES,
        callback: (tokenResponse) => {
            handleTokenResponse(tokenResponse);
        },
    });

    gisInitialized = true;
    
    // Show sign in button will be handled by checkToken function
}

// Show Google Sign In Button
function showGoogleSignInButton() {
    const container = document.getElementById('googleAuthContainer');
    const buttonContainer = document.getElementById('googleSignInButton');
    
    if (container && buttonContainer) {
        container.style.display = 'block';
        
        // Create custom sign in button
        buttonContainer.innerHTML = '<button type="button" class="btn btn-primary" id="customGoogleSignIn">Prijavi se na Google Calendar</button>';
        
        const signInButton = document.getElementById('customGoogleSignIn');
        if (signInButton && tokenClient) {
            signInButton.addEventListener('click', () => {
                tokenClient.requestAccessToken({ prompt: 'consent' });
            });
        }
    }
}

// Handle OAuth token response
function handleTokenResponse(tokenResponse) {
    if (tokenResponse.error !== undefined) {
        throw tokenResponse;
    }
    
    gapi.client.setToken(tokenResponse);
    
    // Hide sign in button after successful authentication
    const container = document.getElementById('googleAuthContainer');
    if (container) {
        container.style.display = 'none';
    }
    
    console.log('Successfully authenticated with Google Calendar');
}

// Request access token
function requestAccessToken() {
    if (tokenClient) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        console.error('Token client not initialized');
    }
}

// Check for existing token on page load
function checkToken() {
    if (gapi.client && gapi.client.getToken()) {
        const container = document.getElementById('googleAuthContainer');
        if (container) {
            container.style.display = 'none';
        }
        return true;
    } else {
        // Show sign in button if not authenticated
        showGoogleSignInButton();
        return false;
    }
}

// Create calendar event
async function createCalendarEvent(eventData) {
    if (!gapi.client || !gapi.client.getToken()) {
        throw new Error('Not authenticated. Please sign in to Google Calendar.');
    }

    try {
        // Check for conflicts first
        const conflicts = await checkForConflicts(eventData.startDateTime, eventData.endDateTime);
        if (conflicts.length > 0) {
            throw new Error('Već postoji termin u ovom vremenskom periodu. Molimo izaberite drugo vreme.');
        }

        // Format dates for Google Calendar API
        // When timeZone is specified, dateTime should be in format: YYYY-MM-DDTHH:mm:ss
        // API will interpret it according to the specified timeZone
        const startDateTime = formatDateForCalendar(eventData.startDateTime);
        const endDateTime = formatDateForCalendar(eventData.endDateTime);

        const event = {
            summary: `Termin – ${eventData.fullName}`,
            description: `Broj telefona: ${eventData.phone}${eventData.service ? `\nUsluga: ${eventData.service}` : ''}${eventData.notes ? `\nNapomene: ${eventData.notes}` : ''}`,
            start: {
                dateTime: startDateTime,
                timeZone: window.CONFIG.TIMEZONE,
            },
            end: {
                dateTime: endDateTime,
                timeZone: window.CONFIG.TIMEZONE,
            },
        };

        const request = gapi.client.calendar.events.insert({
            calendarId: window.CONFIG.CALENDAR_ID,
            resource: event,
        });

        const response = await request;
        return response;
    } catch (error) {
        console.error('Error creating calendar event:', error);
        throw error;
    }
}

// Check for conflicting events
async function checkForConflicts(startDateTime, endDateTime) {
    try {
        const startTime = formatDateForCalendar(startDateTime);
        const endTime = formatDateForCalendar(endDateTime);

        const request = gapi.client.calendar.events.list({
            calendarId: window.CONFIG.CALENDAR_ID,
            timeMin: startTime,
            timeMax: endTime,
            singleEvents: true,
            orderBy: 'startTime',
        });

        const response = await request;
        return response.result.items || [];
    } catch (error) {
        console.error('Error checking for conflicts:', error);
        return [];
    }
}

// Format date for Google Calendar API
// When timeZone is specified in the event object, dateTime should be in format: YYYY-MM-DDTHH:mm:ss
// The API interprets this time according to the specified timeZone parameter
function formatDateForCalendar(dateString) {
    // dateString should be in format: 'YYYY-MM-DDTHH:mm'
    // Parse as local time
    const date = new Date(dateString);
    
    // Format as YYYY-MM-DDTHH:mm:ss (API will interpret according to timeZone parameter)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = '00';
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

// Initialize when DOM is ready and Google APIs are loaded
function initCalendarIntegration() {
    if (typeof gapi === 'undefined' || typeof google === 'undefined') {
        console.error('Google APIs not loaded. Make sure scripts are included in HTML.');
        return;
    }

    initializeGapi();
    
    // Initialize GIS after a short delay to ensure gapi is ready
    setTimeout(() => {
        initializeGis();
        checkToken();
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    // Wait for Google APIs to load
    if (typeof gapi !== 'undefined' && typeof google !== 'undefined') {
        initCalendarIntegration();
    } else {
        // Wait for scripts to load
        window.addEventListener('load', function() {
            setTimeout(() => {
                if (typeof gapi !== 'undefined' && typeof google !== 'undefined') {
                    initCalendarIntegration();
                } else {
                    console.error('Google APIs failed to load. Please check your internet connection and script tags.');
                }
            }, 1000);
        });
    }

    // Handle booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateBookingForm()) {
                return;
            }

            // Check if authenticated
            if (!gapi.client || !gapi.client.getToken()) {
                showMessage('formMessage', 'Molimo se prvo prijavite na Google Calendar.', 'error');
                if (tokenClient) {
                    tokenClient.requestAccessToken({ prompt: 'consent' });
                }
                return;
            }

            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                service: document.getElementById('service').value,
                notes: document.getElementById('notes').value.trim(),
            };

            // Create start and end datetime
            const startDateTime = `${formData.date}T${formData.time}`;
            // Parse start time and add 1 hour for end time
            const [hours, minutes] = formData.time.split(':').map(Number);
            const startDate = new Date(formData.date);
            startDate.setHours(hours, minutes, 0, 0);
            const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour
            const endHours = String(endDate.getHours()).padStart(2, '0');
            const endMinutes = String(endDate.getMinutes()).padStart(2, '0');
            const endDateTimeString = `${formData.date}T${endHours}:${endMinutes}`;

            try {
                // Disable submit button
                const submitButton = document.getElementById('submitButton');
                submitButton.disabled = true;
                submitButton.textContent = 'Zakazuje se...';

                // Create calendar event
                await createCalendarEvent({
                    ...formData,
                    startDateTime: startDateTime,
                    endDateTime: endDateTimeString,
                });

                // Success message
                showMessage('formMessage', 'Uspešno ste zakazali termin! Događaj je dodat u kalendar.', 'success');
                bookingForm.reset();

                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Zakaži termin';
            } catch (error) {
                // Error message
                const errorMsg = error.message || 'Došlo je do greške pri zakazivanju termina. Molimo pokušajte ponovo.';
                showMessage('formMessage', errorMsg, 'error');

                // Re-enable submit button
                const submitButton = document.getElementById('submitButton');
                submitButton.disabled = false;
                submitButton.textContent = 'Zakaži termin';

                // If authentication error, show sign in button
                if (error.message && error.message.includes('authenticated')) {
                    showGoogleSignInButton();
                }
            }
        });
    }
});

// Validate booking form
function validateBookingForm() {
    const fullName = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const date = document.getElementById('date');
    const time = document.getElementById('time');

    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });

    // Validate full name
    if (!fullName.value.trim()) {
        document.getElementById('fullNameError').textContent = 'Molimo unesite ime i prezime.';
        isValid = false;
    }

    // Validate phone
    if (!phone.value.trim()) {
        document.getElementById('phoneError').textContent = 'Molimo unesite broj telefona.';
        isValid = false;
    } else {
        const phoneRegex = /^[+]?[\d\s\-()]{8,}$/;
        if (!phoneRegex.test(phone.value.trim())) {
            document.getElementById('phoneError').textContent = 'Molimo unesite validan broj telefona.';
            isValid = false;
        }
    }

    // Validate date
    if (!date.value) {
        document.getElementById('dateError').textContent = 'Molimo izaberite datum.';
        isValid = false;
    } else {
        const selectedDate = new Date(date.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            document.getElementById('dateError').textContent = 'Datum ne može biti u prošlosti.';
            isValid = false;
        }
    }

    // Validate time
    if (!time.value) {
        document.getElementById('timeError').textContent = 'Molimo izaberite vreme.';
        isValid = false;
    }

    return isValid;
}

// Helper function to show messages
function showMessage(elementId, message, type) {
    const messageEl = document.getElementById(elementId);
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `form-message ${type}`;
        messageEl.style.display = 'block';
        
        // Scroll to message
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
