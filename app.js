const statusEl = document.querySelector("#status");
const markerEl = document.querySelector("#marker-root");
const sceneEl = document.querySelector("a-scene");

function setStatus(message, state) {
  if (!statusEl) return;

  statusEl.textContent = message;
  statusEl.className = `status status--${state}`;
  document.body.dataset.state = state;
}

const hostname = window.location.hostname;
const isLocalHost =
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname === "::1";

if (!window.isSecureContext && !isLocalHost) {
  setStatus(
    "Phone cameras usually need HTTPS. If camera access fails, host this demo on HTTPS.",
    "error",
  );
}

sceneEl?.addEventListener("loaded", () => {
  setStatus("Camera ready. Point at marker #5.", "ready");
});

markerEl?.addEventListener("markerFound", () => {
  setStatus("Marker locked. Primitive anchored.", "found");
});

markerEl?.addEventListener("markerLost", () => {
  setStatus("Marker lost. Bring marker #5 back into view.", "ready");
});

window.addEventListener("camera-error", () => {
  setStatus(
    "Camera access failed. Allow camera permission and use HTTPS on mobile.",
    "error",
  );
});
