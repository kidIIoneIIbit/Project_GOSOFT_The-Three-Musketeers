import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const ThailandGlobe = ({ width = 800, height = 800 }) => {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: height * 2,
      phi: 0,
      theta: 0.3, // Tilt slightly
      dark: 1, // Dark mode
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 3, // Brighten the map lines
      baseColor: [0.03, 0.05, 0.1], // Deep Navy/Black
      markerColor: [0, 255 / 255, 157 / 255], // Neon Emerald for markers
      glowColor: [0, 229 / 255, 255 / 255], // Cyber Cyan Halo
      markers: [
        // Bangkok, Thailand
        { location: [13.7563, 100.5018], size: 0.1 }
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return nothing.
        state.phi = phi;
        phi += 0.003; // Slow rotation
      }
    });

    return () => {
      globe.destroy();
    };
  }, [width, height]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: width,
        aspectRatio: 1,
        margin: "auto",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          animation: "fadeIn 2s ease-in forwards",
        }}
        width={width * 2}
        height={height * 2}
      />
    </div>
  );
};

export default ThailandGlobe;
