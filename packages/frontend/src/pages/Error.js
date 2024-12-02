import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors, spacing } from '../styles/theme';
import { contentContainerStyles, buttonStyles, titleStyles, subheadingStyles, cardStyles, logoStyles } from '../styles/commonStyles';
import logo from '../assets/images/logo.png';

const Error = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const errorMessage = location.state?.errorMessage || "We were unable to verify your profile. This may be due to our AI detection system identifying potential issues with your profile information. Please try again with different profile details.";

    const handleRetry = () => {
        navigate('/register');
    };

    return (
        <div style={cardStyles.container}>
            {/* Logo Section */}
            <div style={logoStyles.container}>
                <img
                    src={logo}
                    alt="Heart icon"
                    style={logoStyles.image}
                />
            </div>

            {/* Content Container */}
            <div style={contentContainerStyles.container}>
                {/* Header Section */}
                <div style={{
                    ...contentContainerStyles.header,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h1 style={{
                        ...titleStyles,
                        marginBottom: spacing.xl
                    }}> 
                        Profile Verification Failed 
                    </h1>
                    <p style={{
                        ...subheadingStyles,
                        textAlign: 'center',
                        maxWidth: '500px',
                        color: colors.gray.text,
                        lineHeight: '1.5'
                    }}>
                        {errorMessage}
                    </p>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <button
                        onClick={handleRetry}
                        style={{
                            ...buttonStyles.base,
                            width: '200px',
                            marginTop: spacing.xl
                        }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Error;