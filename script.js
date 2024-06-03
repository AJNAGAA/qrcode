document.addEventListener('DOMContentLoaded', function() {
    // Update QR code image source with UPI payment link
    var upiId = document.getElementById('upi-id').innerText;
    var qrCodeImg = document.getElementById('qr-code-img');
    qrCodeImg.src = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(upiId) + '&size=300x300';
    
    // Update 'am' hidden input value with the amount entered by the user
    var paymentForm = document.getElementById('payment-form');
    var amountInput = document.getElementById('amount');
    paymentForm.addEventListener('submit', function(event) {
        var amountValue = amountInput.value;
        paymentForm.elements.namedItem('am').value = amountValue;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to check if the device is a mobile device
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    // Update QR code image source with appropriate URL based on device
    var upiId = document.getElementById('upi-id').innerText;
    var qrCodeImg = document.getElementById('qr-code-img');
    var qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(upiId);
    
    // Append size parameter based on device
    if (isMobileDevice()) {
        qrCodeUrl += '&size=200x200'; // Adjust size for mobile devices
    } else {
        qrCodeUrl += '&size=300x300'; // Adjust size for desktop devices
    }
    
    qrCodeImg.src = qrCodeUrl;
    
    // Update 'am' hidden input value with the amount entered by the user
    var paymentForm = document.getElementById('payment-form');
    var amountInput = document.getElementById('amount');
    paymentForm.addEventListener('submit', function(event) {
        var amountValue = amountInput.value;
        paymentForm.elements.namedItem('am').value = amountValue;
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Track visitor count
    var visitorCount = localStorage.getItem('visitorCount');
    if (!visitorCount) {
        localStorage.setItem('visitorCount', 1);
        visitorCount = 1;
    }

    // Display visitor count with animation
    var visitorCountElement = document.getElementById('visitor-count');
    visitorCountElement.textContent = visitorCount;

    // Trigger animation
    visitorCountElement.classList.add('visitor-animate');
});
// Backend server using Node.js and Express.js with sessions

const express = require('express');
const session = require('express-session');
const app = express();

// Use sessions
app.use(session({
    secret: 'secret-key', // Change this to a random secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change this to true if using HTTPS
}));

// Middleware to track unique visitors
app.use((req, res, next) => {
    if (!req.session.visitorId) {
        req.session.visitorId = generateVisitorId();
        incrementVisitorCount();
    }
    next();
});

let visitorCount = 0;

function incrementVisitorCount() {
    visitorCount++;
}

// Generate a unique visitor ID
function generateVisitorId() {
    return Math.random().toString(36).substring(2);
}

// Get visitor count
app.get('/count', (req, res) => {
    res.send({ count: visitorCount });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
