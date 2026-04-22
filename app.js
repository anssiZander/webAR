const statusEl = document.querySelector("#status");
const markerEl = document.querySelector("#marker-root");
const sceneEl = document.querySelector("a-scene");
let markerVisible = false;
let hasFatalError = false;

function setStatus(message, state, options = {}) {
  if (!statusEl) return;
  if (hasFatalError && state !== "error") return;
  if (options.fatal) hasFatalError = true;

  statusEl.textContent = message;
  statusEl.className = `status status--${state}`;
  document.body.dataset.state = state;
}

function setReadyStatus(message) {
  if (markerVisible) return;
  setStatus(message, "ready");
}

function getErrorDetail(event) {
  const error = event?.detail?.error ?? event?.error;
  return error?.message || error?.name || "";
}

function bindVideoLifecycle() {
  const videoEl = document.querySelector("video");
  if (!videoEl || videoEl.dataset.statusBound === "true") return;

  videoEl.dataset.statusBound = "true";

  videoEl.addEventListener("playing", () => {
    setReadyStatus("Camera live. Point at marker #5.");
  });

  const handleVideoStop = () => {
    setStatus(
      "Camera feed stopped. Refresh the page and allow camera access again.",
      "error",
    );
  };

  videoEl.addEventListener("pause", handleVideoStop);
  videoEl.addEventListener("ended", handleVideoStop);
  videoEl.addEventListener("stalled", handleVideoStop);
  videoEl.addEventListener("abort", handleVideoStop);
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
    { fatal: true },
  );
}

sceneEl?.addEventListener("loaded", () => {
  setStatus("AR scene loaded. Waiting for camera permission...", "waiting");
  bindVideoLifecycle();
});

markerEl?.addEventListener("markerFound", () => {
  markerVisible = true;
  setStatus("Marker #5 found. Primitive anchored.", "found");
});

markerEl?.addEventListener("markerLost", () => {
  markerVisible = false;
  setReadyStatus("Marker lost. Bring marker #5 back into view.");
});

window.addEventListener("camera-init", () => {
  setReadyStatus("Camera live. Point at marker #5.");
  bindVideoLifecycle();
});

window.addEventListener("arjs-video-loaded", () => {
  setReadyStatus("Camera feed attached. Point at marker #5.");
  bindVideoLifecycle();
});

window.addEventListener("camera-error", (event) => {
  const detail = getErrorDetail(event);
  setStatus(
    `Camera access failed. Allow camera permission and use HTTPS on mobile${detail ? ` (${detail})` : ""}.`,
    "error",
    { fatal: true },
  );
});

window.addEventListener("load", bindVideoLifecycle, { once: true });
