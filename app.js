const marker = document.querySelector("#main-marker");
const statusText = document.querySelector("#status");
const scene = document.querySelector("a-scene");

function setStatus(message, color) {
  if (!statusText) return;
  statusText.innerText = message;
  statusText.style.color = color;
}

function getViewportSize() {
  const viewport = window.visualViewport;

  return {
    width: Math.round(viewport?.width || window.innerWidth),
    height: Math.round(viewport?.height || window.innerHeight),
  };
}

function resizeTarget(element, width, height) {
  if (!element) return;

  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
}

function syncViewport() {
  const { width, height } = getViewportSize();

  document.documentElement.style.setProperty("--app-height", `${height}px`);

  resizeTarget(document.body, width, height);
  resizeTarget(scene, width, height);
  resizeTarget(scene?.canvas, width, height);
  resizeTarget(document.querySelector("#arjs-video"), width, height);
  resizeTarget(document.querySelector("video"), width, height);

  if (typeof scene?.resize === "function") {
    scene.resize();
  }
}

function scheduleViewportSync() {
  syncViewport();
  window.setTimeout(syncViewport, 120);
  window.setTimeout(syncViewport, 360);
}

marker?.addEventListener("markerFound", () => {
  setStatus("Marker found!", "#00ff00");
});

marker?.addEventListener("markerLost", () => {
  setStatus("Waiting for marker...", "#aaaaaa");
});

window.addEventListener("load", scheduleViewportSync, { once: true });
window.addEventListener("resize", scheduleViewportSync);
window.addEventListener("orientationchange", scheduleViewportSync);
window.addEventListener("camera-init", scheduleViewportSync);
window.addEventListener("arjs-video-loaded", scheduleViewportSync);

window.visualViewport?.addEventListener("resize", scheduleViewportSync);
window.visualViewport?.addEventListener("scroll", scheduleViewportSync);

scene?.addEventListener("loaded", scheduleViewportSync);

const observer = new MutationObserver(() => {
  const arVideo = document.querySelector("#arjs-video");
  const cameraVideo = document.querySelector("video");

  if (!arVideo && !cameraVideo) return;

  scheduleViewportSync();
  observer.disconnect();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
