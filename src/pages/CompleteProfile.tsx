import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import Navbar from '../components/Navbar';
import { User, Phone, Save } from 'lucide-react';

export default function CompleteProfile() {
    const { user, profile, refreshProfile } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.displayName || '');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // If user already has a profile, redirect to home
    React.useEffect(() => {
        if (profile?.name && profile?.phone) {
            navigate('/');
        }
    }, [profile, navigate]);

    // Prevent flicker: Don't render form if profile is loading or already exists
    if (profile === undefined) {
        return <div className="page-container"><Navbar hideUserMenu={true} /><div style={{ padding: '100px', textAlign: 'center', color: 'white' }}>Loading...</div></div>;
    }

    if (profile?.name && profile?.phone) {
        return null; // Don't render anything while redirecting
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setError('');

        try {
            const success = await api.saveUserProfile(user.uid, {
                name,
                phone,
                email: user.email || ''
            });

            if (success) {
                await refreshProfile();
                navigate('/'); // Redirect to home/booking on success
            } else {
                setError('Failed to save profile. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <Navbar hideUserMenu={true} />
            <div style={{ maxWidth: '500px', width: '100%', margin: '120px auto 40px', padding: '20px' }}>
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-card)',
                    padding: '32px'
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>Complete Your Profile</h2>
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '24px' }}>
                        We need a few details to process your bookings correctly.
                    </p>

                    {error && (
                        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', marginBottom: '20px' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{ width: '100%', paddingLeft: '40px' }}
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    style={{ width: '100%', paddingLeft: '40px' }}
                                    placeholder="Enter your phone number"
                                    pattern="[0-9]{10}"
                                    title="Ten digit mobile number"
                                    maxLength={10}
                                />
                            </div>
                        </div>

                        <button disabled={loading} className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                            {loading ? 'Saving...' : 'Save & Continue'} <Save size={18} style={{ marginLeft: '8px' }} />
                        </button>
                    </form>


                </div>
            </div>
        </div>
    );
}
