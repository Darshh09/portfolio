import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

interface GlobeConfig {
  pointSize: number;
  globeColor: string;
  showAtmosphere: boolean;
  atmosphereColor: string;
  atmosphereAltitude: number;
  emissive: string;
  emissiveIntensity: number;
  shininess: number;
  polygonColor: string;
  ambientLight: string;
  directionalLeftLight: string;
  directionalTopLight: string;
  pointLight: string;
  arcTime: number;
  arcLength: number;
  rings: number;
  maxRings: number;
  initialPosition: { lat: number; lng: number };
  autoRotate: boolean;
  autoRotateSpeed: number;
}

interface ArcData {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}

interface WorldProps {
  data: ArcData[];
  globeConfig: GlobeConfig;
}

export const World = React.forwardRef<any, WorldProps>(({ data, globeConfig }, ref) => {
  const globeRef = useRef<any>();

  useEffect(() => {
    if (globeRef.current) {
      const globe = globeRef.current;

      // Set initial camera position
      globe.pointOfView({
        lat: globeConfig.initialPosition.lat,
        lng: globeConfig.initialPosition.lng,
        altitude: 2
      });

      // Auto-rotate
      if (globeConfig.autoRotate) {
        const controls = globe.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = globeConfig.autoRotateSpeed;
      }
    }
  }, [globeConfig]);

  // Forward the ref
  useEffect(() => {
    if (ref && typeof ref === 'object') {
      (ref as any).current = globeRef.current;
    }
  }, [ref]);

  return (
    <Globe
      ref={globeRef}
      width={800}
      height={800}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

      // Globe material
      globeMaterial={{
        color: globeConfig.globeColor,
        emissive: globeConfig.emissive,
        emissiveIntensity: globeConfig.emissiveIntensity,
        shininess: globeConfig.shininess
      }}

      // Atmosphere
      showAtmosphere={globeConfig.showAtmosphere}
      atmosphereColor={globeConfig.atmosphereColor}
      atmosphereAltitude={globeConfig.atmosphereAltitude}

      // Arcs
      arcsData={data}
      arcColor="color"
      arcAltitude="arcAlt"
      arcStroke={0.8}
      arcDashLength={globeConfig.arcLength}
      arcDashGap={1.5}
      arcDashAnimateTime={globeConfig.arcTime}

      // Enhanced interactivity
      enablePointerInteraction={true}
    />
  );
});
