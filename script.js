document.getElementById("generate-qr-btn").addEventListener("click", () => {
  const upiId = document.getElementById("upi-id").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const remarks = document.getElementById("remarks").value.trim();

  if (!upiId) {
    alert("Please enter your UPI ID.");
    return;
  }

  // Create UPI QR Code URL
  let upiUrl = `upi://pay?pa=${upiId}&pn=YourName&cu=INR`;
  
  if (amount) {
    upiUrl += `&am=${amount}`;
  }

  if (remarks) {
    upiUrl += `&tn=${encodeURIComponent(remarks)}`;
  }

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
