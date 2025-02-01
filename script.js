// Initialize QR Code Scanner
const qrReader = new Html5Qrcode("qr-reader");
qrReader.start(
  { facingMode: "environment" }, // Use rear camera
  {
    fps: 10,
    qrbox: { width: 250, height: 250 }
  },
  (decodedText) => {
    // Extract UPI ID from QR Code (if in the format `upi://pay?pa=upi-id`)
    const urlParams = new URLSearchParams(decodedText.split('?')[1]);
    const upiId = urlParams.get('pa');
    if (upiId) {
      document.getElementById('upi-id').value = upiId;
      alert("UPI ID fetched from QR Code: " + upiId);
    } else {
      alert("Invalid QR Code format.");
    }
    qrReader.stop(); // Stop scanning after successful read
  },
  (errorMessage) => {
    console.error("QR Code scanning error:", errorMessage);
  }
);

// Handle Pay Button Click
document.getElementById('pay-btn').addEventListener('click', () => {
  const upiId = document.getElementById('upi-id').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const remarks = document.getElementById('remarks').value.trim();

  if (!upiId) {
    alert("Please enter a valid UPI ID.");
    return;
  }

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  alert(`Payment Initiated:
  UPI ID: ${upiId}
  Amount: ₹${amount}
  Remarks: ${remarks || 'N/A'}
  (Simulated Payment)`);
});
