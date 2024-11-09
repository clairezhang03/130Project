import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as CredibleCupid from '../credible_cupid/src/index';
import InitDefaultCredibleCupidClient from '../client/Client';
import { colors, spacing } from '../styles/theme';
import { buttonStyles, inputStyles, cardStyles } from '../styles/commonStyles';
import logo from '../assets/images/logo.png';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    bio: '',
    gender: '',
    age: '',
    height: '',
    occupation: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    InitDefaultCredibleCupidClient(null);
    let apiInstance = new CredibleCupid.AuthApi();
    let registerRequest = new CredibleCupid.RegisterRequest(
      formData.email,
      formData.password,
      {
        bio: formData.bio,
        gender: formData.gender,
        age: parseInt(formData.age),
        height: parseInt(formData.height),
        occupation: formData.occupation
      }
    );

    apiInstance.authRegister(registerRequest, (error, data, response) => {
      if (error) {
        console.error(response);
        console.error(response.body.message);
        console.error(response.body.statusCode);
      } else {
        console.log("Successfully registered!");
        navigate('/login');
      }
      setIsLoading(false);
    });
  };

  return (
    <div style={cardStyles.container}>
      {/* Logo Section */}
      <div style={{
        width: '120px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '60px'
      }}>
        <img
          src={logo}
          alt="Heart icon"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: 0.9
          }}
        />
      </div>

      {/* Content Container */}
      <div style={{
        width: '100%',
        padding: `0 ${spacing.xl}`,
        maxWidth: '400px',
        marginTop: spacing.xl
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: spacing.xl
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: colors.gray.text,
            margin: `0 0 ${spacing.xs} 0`
          }}>
            Create Account
          </h1>
          <p style={{
            fontSize: '16px',
            color: colors.gray.text,
            opacity: 0.7,
            margin: 0
          }}>
            Join Credible Cupid today
          </p>
        </div>

        {/* Form Section */}
        <form 
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.lg
          }}
          onSubmit={handleSubmit}
        >
          {/* Email Input */}
          <div style={inputStyles.container}>
            <label style={inputStyles.label}>Email</label>
            <input
              style={inputStyles.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div style={inputStyles.container}>
            <label style={inputStyles.label}>Password</label>
            <input
              style={inputStyles.input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </div>

          {/* Bio Input */}
          <div style={inputStyles.container}>
            <label style={inputStyles.label}>Bio</label>
            <textarea
              style={{
                ...inputStyles.input,
                minHeight: '100px',
                resize: 'vertical'
              }}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              placeholder="Tell us about yourself"
            />
          </div>

          {/* Gender Input */}
          <div style={inputStyles.container}>
            <label style={inputStyles.label}>Gender</label>
            <select
              style={inputStyles.input}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Age Input */}
          <div style={inputStyles.container}>
            <label style={inputStyles.label}>Age</label>
            <input
              style={inputStyles.input}
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="18"
              max="120"
              placeholder="Enter your age"
            />
          </div>

          {/* Height Input */}
          <div style={inputStyles.container}>
            <label style={inputStyles.label}>Height (cm)</label>
            <input
              style={inputStyles.input}
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              min="100"
              max="250"
              placeholder="Enter your height in cm"
            />
          </div>

          {/* Occupation Input */}
          <div style={inputStyles.container}>
            <label style={inputStyles.label}>Occupation</label>
            <input
              style={inputStyles.input}
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
              placeholder="Enter your occupation"
            />
          </div>

          {/* Submit Button */}
          <button
            style={{
              ...buttonStyles.base,
              marginTop: spacing.md
            }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <p style={{
          textAlign: 'center',
          marginTop: spacing.lg,
          fontSize: '14px',
          color: colors.gray.text
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: colors.primary,
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;