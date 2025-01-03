// Get the video element
const video = document.querySelector('#video')
// Check if device has camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Use video without audio
  const constraints = { 
    video: {
      facingMode: {
        exact: "environment"
      }
    },
    audio: false
  }
  
  // Start video stream
  navigator.mediaDevices.getUserMedia(constraints).then(stream => video.srcObject = stream);
}

// Create new barcode detector
const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
const enableAudioButton = document.getElementById('enableAudio');

    let audioEnabled = false; // Track if audio is enabled by the user

    // Enable audio playback on button click
    enableAudioButton.addEventListener('click', () => {
      audioEnabled = true;
      enableAudioButton.style.display = 'none'; // Hide the button after enabling audio
    });



// Detect code function 
const detectCode = () => {
  // Start detecting codes on to the video element
  barcodeDetector.detect(video).then(codes => {
    // If no codes exit function
    if (codes.length === 0) return;
    
    for (const barcode of codes)  {
      // Log the barcode to the console
      console.log(barcode)
      //document.getElementById("tekstas").textContent=barcode.rawValue
      document.getElementById("tekstas").textContent="Grojam4"
      // Show message "NUSKAITYTA" on the screen
      //messageElement.style.display = 'block';  // Display the message
      //setTimeout(() => {
      //  messageElement.style.display = 'none'; // Hide message after 2 seconds
      //}, 2000);
      // Set the audio source and play the audio

      if (audioEnabled) {
        audioElement.src = barcode.rawValue;  // Set the source to the QR code URL
        audioElement.play().catch(err => {
          console.error("Garso paleidimo klaida:", err);
          document.getElementById("tekstas").textContent= "Nepavyko paleisti garso.";
        });
      }

    }
  }).catch(err => {
    // Log an error if one happens
    console.error(err);
  })
}

// Run detect code function every 100 milliseconds
setInterval(detectCode, 100);
