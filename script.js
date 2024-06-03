document.addEventListener('DOMContentLoaded', function() {
    // Update QR code image source with UPI payment link
    var upiId = document.getElementById('upi-id').innerText;
    var qrCodeImg = document.getElementById('qr-code-img');
    qrCodeImg.src = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(upiId) + '&size=300x300';
    
    // Function to check if the device is a mobile device
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    // Update QR code image source with appropriate URL based on device
    var qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(upiId);
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

    // Track visitor count
    var visitorCount = localStorage.getItem('visitorCount');
    if (!visitorCount) {
        localStorage.setItem('visitorCount', 1);
        visitorCount = 1;
    } else {
        visitorCount = parseInt(visitorCount) + 1;
        localStorage.setItem('visitorCount', visitorCount);
    }

    // Display visitor count with animation
    var visitorCountElement = document.getElementById('visitor-count');
    visitorCountElement.textContent = visitorCount;

    // Trigger animation
    visitorCountElement.classList.add('visitor-animate');
});
