const video = document.getElementById("scanner-preview");
const scanResult = document.getElementById("scan-result");
const scannerInstructions = document.getElementById("scanner-instructions");
const stopScanButton = document.getElementById("stop-scan");

let stream;
let barcodeDetector;

async function startScanner() {
  if (!("BarcodeDetector" in window)) {
    scanResult.textContent = "BarcodeDetector API is not supported in this browser.";
    return;
  }

  barcodeDetector = new BarcodeDetector({ formats: ["qr_code"] });

  try {
    
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = stream;
    video.play();

    
    scanLoop();
  } catch (error) {
    console.error("Error accessing the camera:", error);
    scannerInstructions.textContent = "Unable to access the camera.";
  }
}

async function scanLoop() {
  try {
    const barcodes = await barcodeDetector.detect(video);

    if (barcodes.length > 0) {
      const qrData = barcodes[0].rawValue;
      scanResult.textContent = `Transaction Code: ${qrData}`;
      stopScanner();
    } else {
      requestAnimationFrame(scanLoop);
    }
  } catch (error) {
    console.error("Error during scanning:", error);
  }
}

function stopScanner() {
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  }

  video.srcObject = null;
  scannerInstructions.textContent = "Scanner stopped.";
}

stopScanButton.addEventListener("click", stopScanner);


startScanner();