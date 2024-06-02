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
