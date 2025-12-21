import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api, type Booking } from '../lib/api';
import Navbar from '../components/Navbar';
import { User, Phone, Mail, Save, Edit2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
    const { user, profile, refreshProfile, logout } = useAuth();
    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loadingBookings, setLoadingBookings] = useState(true);

    useEffect(() => {
        if (user) {
            setLoadingBookings(true);
            api.getUserBookings(user.uid).then(data => {
                setBookings(data);
                setLoadingBookings(false);
            });
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (profile) {
            setName(profile.name);
            setPhone(profile.phone);
        }
    }, [profile, user, navigate]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            const success = await api.saveUserProfile(user.uid, {
                name,
                phone,
                email: user.email || ''
            });

            if (success) {
                await refreshProfile();
                setSuccessMsg('Profile updated successfully!');
                setEditing(false);
            } else {
                setError('Failed to update profile.');
            }
        } catch (err) {
            setError('An error occurred while saving.');
        } finally {
            setLoading(false);
        }
    };

    if (!profile && !editing) {
        return (
            <div className="page-container">
                <Navbar />
                <div style={{ padding: '100px', textAlign: 'center', color: 'white' }}>Loading Profile...</div>
            </div>
        )
    }

    return (
        <div className="page-container">
            <Navbar />
            <div style={{ maxWidth: '600px', width: '100%', margin: '120px auto 40px', padding: '20px' }}>

                {/* My Bookings Card */}
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-card)',
                    padding: '32px',
                    marginBottom: '24px'
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>My Bookings</h2>

                    {loadingBookings ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading your bookings...</div>
                    ) : bookings.length === 0 ? (
                        <div style={{
                            padding: '32px',
                            textAlign: 'center',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px dashed var(--border)',
                            borderRadius: 'var(--radius-card)',
                            color: 'var(--text-muted)'
                        }}>
                            <p style={{ marginBottom: '16px' }}>You have no bookings yet.</p>
                            <button onClick={() => navigate('/')} className="btn btn-primary" style={{ fontSize: '14px' }}>Book a Service</button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '16px' }}>
                            {bookings.map(booking => (
                                <div key={booking.id} style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-card)',
                                    padding: '20px',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>{booking.problem}</div>
                                            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                        </div>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            background: booking.status === 'Confirmed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                                            color: booking.status === 'Confirmed' ? '#22c55e' : '#eab308',
                                            border: booking.status === 'Confirmed' ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(234, 179, 8, 0.2)'
                                        }}>{booking.status}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border)', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span>🕒 {booking.time}</span>
                                        </div>
                                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>₹{booking.fee}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* My Profile Card */}
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-card)',
                    padding: '32px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>My Profile</h2>
                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="btn"
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    background: 'transparent',
                                    border: '1px solid var(--primary)',
                                    color: 'var(--primary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontWeight: '500'
                                }}
                            >
                                <Edit2 size={16} style={{ marginRight: '8px' }} /> Edit
                            </button>
                        )}
                    </div>

                    {error && <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}
                    {successMsg && <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '8px', marginBottom: '20px' }}>{successMsg}</div>}

                    <form onSubmit={handleSave}>
                        <div className="form-group" style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Email</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-card-hover)', borderRadius: '8px' }}>
                                <Mail size={18} color="var(--text-muted)" />
                                <span style={{ color: 'var(--text-primary)' }}>{user?.email}</span>
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    required
                                    disabled={!editing}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        paddingLeft: '40px',
                                        opacity: editing ? 1 : 0.7,
                                        cursor: editing ? 'text' : 'not-allowed'
                                    }}
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
                                    disabled={!editing}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    style={{
                                        width: '100%',
                                        paddingLeft: '40px',
                                        opacity: editing ? 1 : 0.7,
                                        cursor: editing ? 'text' : 'not-allowed'
                                    }}
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                />
                            </div>
                        </div>

                        {editing && (
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => { setEditing(false); setName(profile?.name || ''); setPhone(profile?.phone || ''); }}
                                    className="btn"
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        background: 'transparent',
                                        border: '1px solid var(--text-muted)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={loading}
                                    className="btn btn-primary"
                                    type="submit"
                                    style={{ flex: 1, justifyContent: 'center' }}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'} <Save size={18} style={{ marginLeft: '8px' }} />
                                </button>
                            </div>
                        )}
                    </form>

                    {!editing && (
                        <div style={{ marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                            <button
                                onClick={async () => {
                                    await logout();
                                    navigate('/login');
                                }}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: '12px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid #ef4444',
                                    borderRadius: '8px',
                                    color: '#ef4444',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <LogOut size={16} />
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
