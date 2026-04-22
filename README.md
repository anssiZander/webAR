# A-Frame Marker AR Demo

This repo is a minimal mobile Web AR starter built for GitHub Pages with A-Frame and AR.js marker tracking.

For the first working pass, the target is a barcode-style AR marker tag, not an arbitrary poster or photo. When the camera recognizes marker `#5`, it anchors a small animated primitive stack on top of it.

## Files

- `index.html` is the AR experience.
- `marker.html` shows the tag image you can print or display on a second screen.
- `app.js` handles marker and camera status messages.
- `styles.css` styles the HUD and marker page.

## Deploy To GitHub Pages

1. Push these files to a GitHub repository.
2. In the repository settings, enable GitHub Pages and publish from the repo root.
3. Open the published `index.html` URL on your phone.
4. Open `marker.html` on another screen, or print it.
5. Point the camera at the marker and the primitive will appear.

## Important Mobile Note

Most phone browsers require **HTTPS** for camera access. GitHub Pages gives you that automatically, which is why this project is set up as a plain static site.

## Swap In Three.js Later

The handoff point is the `<a-marker id="marker-root">` block in `index.html`.

Right now it contains A-Frame primitives:

- base circle
- torus ring
- floating box
- pulsing cone

Later, we can replace those children with a custom Three.js-driven object while keeping the same marker-tracking flow.
