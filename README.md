# A-Frame Barcode Marker Demo

This repo is now a stripped-down AR.js/A-Frame marker demo.

- `index.html` is the AR experience.
- `marker.html` shows the bundled `barcode-5.png` marker.
- `assets/markers/barcode-5.png` is the marker image the demo expects.

The scene uses AR.js barcode tracking with:

- marker type: `barcode`
- marker value: `5`
- matrix code type: `3x3`

Use HTTPS on mobile, open `index.html` on the phone, open `marker.html` on a second screen or print it, and point the camera at the marker.
