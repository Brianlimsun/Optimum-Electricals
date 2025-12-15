const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_WEBHOOK || 'https://script.google.com/macros/s/AKfycbz1HdD7qBhLSP6FxkXDkXRnPXaFw3HJ23KoZmEHp3QNVB_dH3IEQov2A7Ox58yO7IEc/exec';
console.log('🔌 API URL configured as:', APPS_SCRIPT_URL);


export interface UserProfile {
    name: string;
    phone: string;
    email: string;
}

export interface Booking {
    id: number;
    problem: string;
    date: string;
    time: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    fee: number;
    timestamp: string;
}

export const api = {
    async getUserProfile(userId: string): Promise<UserProfile | null> {
        try {
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                // Google Apps Script usually requires 'Content-Type': 'text/plain' to avoid preflight OPTIONS checks
                // which often fail on GAS.
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify({ action: 'getProfile', userId }),
            });

            const data = await response.json();
            if (data.result === 'success' && data.data) {
                return data.data;
            }
            return null;
        } catch (error) {
            console.error('Error fetching profile:', error);
            return null;
        }
    },

    async saveUserProfile(userId: string, profile: UserProfile): Promise<boolean> {
        try {
            // Use no-cors for fire-and-forget or if we don't strictly need the response body to succeed 
            // (though here we want validation). 
            // We will try standard fetch.
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify({
                    action: 'saveProfile',
                    userId,
                    ...profile
                }),
            });

            const data = await response.json();
            return data.result === 'success';
        } catch (error) {
            console.error('Error saving profile:', error);
            return false;
        }
    },

    async getUserBookings(userId: string): Promise<Booking[]> {
        console.log(`📥 Fetching bookings for User ID: ${userId}`);
        try {
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify({ action: 'getUserBookings', userId }),
            });

            const data = await response.json();
            console.log('📤 Get User Bookings Response:', data);

            if (data.result === 'success' && Array.isArray(data.bookings)) {
                return data.bookings;
            }
            return [];
        } catch (error) {
            console.error('❌ Error fetching bookings:', error);
            return [];
        }
    }
};
