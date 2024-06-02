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
    // Animate QR code
    var qrCodeImg = document.getElementById('qr-code-img');
    qrCodeImg.classList.add('pulse');

    // Track visitor count
    var visitorCount = localStorage.getItem('visitorCount');
    if (visitorCount) {
        visitorCount = parseInt(visitorCount) + 1;
    } else {
        visitorCount = 1;
    }
    localStorage.setItem('visitorCount', visitorCount);
    document.getElementById('visitor-count').textContent = visitorCount + ' visitors';
});
