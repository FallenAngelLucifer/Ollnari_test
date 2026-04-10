import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl = "/nicaragua.json";

export const MapaNicaragua = ({
  className = "",
  onRegionClick,
  activeRegion,
  children
}: {
  className?: string;
  onRegionClick?: (id: string) => void;
  activeRegion?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={className}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 6000,
          center: [-85.2, 12.8] // Coordinates for Nicaragua
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup center={[-85.2, 12.8]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const regionName = geo.properties.name || geo.properties.NAME_1;
                const isSelected = activeRegion === regionName;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isSelected ? "#c28e5c" : "#d4a373"}
                    stroke="#ffffff"
                    strokeWidth={0.5}
                    style={{
                      default: {
                        outline: "none",
                      },
                      hover: {
                        fill: "#b07b48",
                        outline: "none",
                        cursor: "pointer"
                      },
                      pressed: {
                        fill: "#8c5b30",
                        outline: "none",
                      },
                    }}
                    onClick={() => {
                      if (onRegionClick && regionName) {
                        onRegionClick(regionName);
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
          {children}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};
