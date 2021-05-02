import React, { useState, memo } from "react";
import { scaleLinear } from "d3-scale";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const TravelMap = ({ getCode, setTooltipContent, sort, lockdown, data }) => {
  const [selectedBtn, setSelectedBtn] = useState("");

  const colorScale = scaleLinear()
    .domain([0, sort === "rate" ? 350 : 20000])
    .range(["#ffedea", "#ff5233"]);

  return (
    <>
      <ComposableMap
        data-tip=""
        projectionConfig={{ scale: 200 }}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.code === geo.properties.ISO_A2);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={(e) => {
                      getCode(geo.properties.ISO_A2);
                      setSelectedBtn(geo.rsmKey);
                    }}
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      setTooltipContent(
                        `${NAME} — ${
                          d !== undefined
                            ? d[sort] + (sort === "rate" ? "" : " cases")
                            : "N/a"
                        }`
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: `${
                          lockdown && d !== undefined
                            ? d["lockdown"] === "Yes"
                              ? "green"
                              : geo.rsmKey === selectedBtn
                              ? "#064967"
                              : d
                              ? colorScale(d[sort])
                              : "#F5F4F6"
                            : geo.rsmKey === selectedBtn
                            ? "#064967"
                            : d
                            ? colorScale(d[sort])
                            : "#F5F4F6"
                        }`,
                        outline: "none",
                      },
                      hover: {
                        fill: "#2DAEE2",
                        outline: "none",
                      },
                      focus: {
                        color: "#FFFFFF",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};
export default memo(TravelMap);
