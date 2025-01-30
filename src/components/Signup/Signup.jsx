import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    number: ''
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (formData.username.length < 3) return 'Username must be at least 3 characters long';
    if (!formData.email) return 'Email is required';
    if (!formData.name) return 'Name is required';
   
    if (formData.password.length < 6) return 'Password must be at least 6 characters long';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return setError(error);

    setLoading(true);
    try {
      const response = await fetch('https://bidbetter-backend.onrender.com/reqOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const result = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setError('');
        setSuccess('OTP sent successfully! Please check your email.');
      } else {
        setError(result.message || 'Failed to send OTP');
        if (result.error) {
          console.error('Error details:', result.error);
        }
      }
    } catch (error) {
      setError('Server error. Please try again later.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return setError('OTP is required');

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/verifyOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          otp,
          password: formData.password
        }),
      });

      const result = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(result.message || 'Failed to verify OTP');
      }
    } catch (error) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
    <div className="signup-right">
      <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
        <h2>Signup</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
  
        {!otpSent && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
           
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </>
        )}
  
        {otpSent && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        )}
  
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP'}
        </button>
      </form>
      <img 
        src="https://i.pinimg.com/originals/e6/21/53/e621531812027dbcc16172b22ffd1241.png" 
        alt="Signup" 
        className="signup-image" 
      />
     
    </div>
    <div className='already'>
       
     <p className="Login-link">
     Already have an account? <Link to="/login">Login here </Link>
               </p>
      </div>
  </div>
  
  );
};

export default Signup;
