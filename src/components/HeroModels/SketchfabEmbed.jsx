import React from "react";

/**
 * Embeds the exact Sketchfab "Futuristic Desk and Chair" model by dengxiart.
 * https://sketchfab.com/3d-models/futuristic-desk-and-chair-2a2d324174d045cfb28db422a279dbdf
 *
 * Sketchfab embeds are free for all models, even paid-download ones.
 * The overlay <div>s cover the Sketchfab branding UI that renders inside
 * the iframe (title bar, $ button, ?, settings, VR icons) by painting over
 * them with the page's own background color — no paid plan required.
 */
const SketchfabEmbed = () => {
  const modelId = "2a2d324174d045cfb28db422a279dbdf";

  const src = [
    `https://sketchfab.com/models/${modelId}/embed`,
    "?autostart=1",
    "&ui_controls=0",   // hides bottom toolbar
    "&ui_infos=0",      // hides model-info overlay
    "&ui_watermark_link=0",
    "&transparent=1",   // transparent bg — page bg shows through
    "&camera=0",
    "&annotations_visible=0",
    "&dnt=1",
  ].join("");

  /* Gradient that fades from solid black → transparent,
     used for top and bottom so the model blends naturally. */
  const topGrad = "linear-gradient(to bottom, #000000 0%, #000000 85%, transparent 100%)";
  const bottomGrad = "linear-gradient(to top,    #000000 0%, #000000 85%, transparent 100%)";

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>

      {/* ── The Sketchfab 3D viewer ── */}
      <iframe
        title="Futuristic Desk and Chair"
        src={src}
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          background: "transparent",
          display: "block",
        }}
      />

      {/* ══ Overlay strips — sit above the iframe, cover Sketchfab UI ══ */}

      {/* TOP: covers model title ("Futuristic Desk and Chair by dengxiart")
               and the "$" buy-button in the top-right corner */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "46px",
          background: topGrad,
          zIndex: 30,
          pointerEvents: "none",
        }}
      />

      {/* BOTTOM: covers "?", settings gear, VR/fullscreen icons, Sketchfab logo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "54px",
          background: bottomGrad,
          zIndex: 30,
          pointerEvents: "none",
        }}
      />

      {/* RIGHT EDGE: extra cover for the $ button that sits flush right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, right: 0,
          width: "56px",
          height: "46px",
          background: "#000000",
          zIndex: 31,
          pointerEvents: "none",
        }}
      />

      {/* BOTTOM-RIGHT: extra cover for the settings/? cluster */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0, right: 0,
          width: "140px",
          height: "54px",
          background: "#000000",
          zIndex: 31,
          pointerEvents: "none",
        }}
      />

      {/* BOTTOM-LEFT: covers the Sketchfab 3D logo mark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0, left: 0,
          width: "80px",
          height: "44px",
          background: "#000000",
          zIndex: 31,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default SketchfabEmbed;
