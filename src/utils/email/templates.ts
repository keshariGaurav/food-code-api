export const templates = {
    welcome: {
        subject: 'Welcome to Easy Eats!',
        text: 'Dear {name},\n\nWelcome to Easy Eats! Thank you for choosing our cafe for your dining experience. You can easily order your favorite dishes by scanning the QR code on your table. We hope you enjoy your meal!',
        html: '<p>Dear {name},</p><p>Welcome to <strong>Easy Eats</strong>! Thank you for choosing our cafe for your dining experience. You can easily order your favorite dishes by scanning the QR code on your table. We hope you enjoy your meal!</p>',
    },
    passwordReset: {
        subject: 'Easy Eats Password Reset Request',
        text: 'Hi {name},\n\nIt looks like you requested a password reset for your Easy Eats account. Please reset your password using the following link: {resetLink}\n\nIf you did not request this, please ignore this email.',
        html: '<p>Hi {name},</p><p>It looks like you requested a password reset for your <strong>Easy Eats</strong> account. Please reset your password using the following link: <a href="{resetLink}">Reset Password</a>.</p><p>If you did not request this, please ignore this email.</p>',
    },
    orderConfirmation: {
        subject: 'Your Easy Eats Order Confirmation',
        text: 'Hi {name},\n\nThank you for your order at Easy Eats! Your order number is {orderNumber}. We are preparing your delicious meal and will serve it shortly. Enjoy your meal!',
        html: '<p>Hi {name},</p><p>Thank you for your order at <strong>Easy Eats</strong>! Your order number is {orderNumber}. We are preparing your delicious meal and will serve it shortly. Enjoy your meal!</p>',
    },
    promotionalOffer: {
        subject: 'Special Offer Just for You at Easy Eats!',
        text: 'Dear {name},\n\nWe have an exciting offer just for you! Enjoy {offerDetails} on your next visit to Easy Eats. Don’t miss out on this delicious deal!',
        html: '<p>Dear {name},</p><p>We have an exciting offer just for you! Enjoy <strong>{offerDetails}</strong> on your next visit to <strong>Easy Eats</strong>. Don’t miss out on this delicious deal!</p>',
    },
    loginOTP: {
        subject: 'Your Easy Eats OTP Code',
        text: 'Hi {name},\n\nYour OTP code for logging into Easy Eats is {otp}. This code is valid for 10 minutes.\n\nIf you did not request this, please ignore this email.',
        html: '<p>Hi {name},</p><p>Your OTP code for logging into <strong>Easy Eats</strong> is <strong>{otp}</strong>. This code is valid for 10 minutes.</p><p>If you did not request this, please ignore this email.</p>',
    },
};
