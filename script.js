const qrReader = new Html5Qrcode("qr-reader"); // Initialize QR Scanner div

// Start QR Scanner
document.getElementById("start-scan-btn").addEventListener("click", () => {
  qrReader.start(
    { facingMode: "environment" }, // Use rear camera
    {
      fps: 10, // Frames per second
      qrbox: { width: 250, height: 250 } // QR Code scanning box dimensions
    },
    (decodedText) => {
      // Extract UPI ID from the decoded QR code
      const urlParams = new URLSearchParams(decodedText.split("?")[1]);
      const upiId = urlParams.get("pa");
      if (upiId) {
        document.getElementById("upi-id").value = upiId;
        alert("UPI ID fetched from QR Code: " + upiId);
      } else {
        alert("Invalid QR Code format.");
      }
      qrReader.stop(); // Stop scanner after a successful scan
      toggleScannerButtons(false); // Reset button state
    },
    (errorMessage) => {
      console.error("QR Code scanning error:", errorMessage);
    }
  ).then(() => {
    toggleScannerButtons(true); // Show stop button after starting scanner
  }).catch((err) => {
    alert("Camera permissions are required to scan QR codes!");
    console.error("QR Scanner initialization error:", err);
  });
});

// Stop QR Scanner
document.getElementById("stop-scan-btn").addEventListener("click", () => {
  qrReader.stop().then(() => {
    toggleScannerButtons(false); // Reset button state
  }).catch((err) => {
    console.error("Error stopping QR Scanner:", err);
  });
});

// Toggle Start/Stop Buttons
function toggleScannerButtons(isScanning) {
  document.getElementById("start-scan-btn").style.display = isScanning ? "none" : "block";
  document.getElementById("stop-scan-btn").style.display = isScanning ? "block" : "none";
}

// Handle Pay Button Click
document.getElementById("pay-btn").addEventListener("click", () => {
  const upiId = document.getElementById("upi-id").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const remarks = document.getElementById("remarks").value.trim();

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
