document.getElementById("generate-qr-btn").addEventListener("click", () => {
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

  // Create UPI QR Code URL
  const upiUrl = `upi://pay?pa=${upiId}&pn=Recipient&am=${amount}&cu=INR&tn=${encodeURIComponent(
    remarks
  )}`;

  // Generate QR Code
  const qrCodeDiv = document.getElementById("qr-code");
  qrCodeDiv.innerHTML = ""; // Clear previous QR code
  QRCode.toCanvas(qrCodeDiv, upiUrl, { width: 250 }, (error) => {
    if (error) {
      console.error("QR Code generation error:", error);
    } else {
      console.log("QR Code generated successfully!");
    }
  });
});
