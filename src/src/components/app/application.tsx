import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile.js";
import { OSM } from "ol/source.js";
import { useGeographic } from "ol/proj.js";
import "ol/ol.css";
import { Style, Stroke, Fill, Circle as CircleStyle } from "ol/style";

import { tilfluktsromLayer } from "../layers/tilfluktsromLayer.js";
import { SFdistrikterLayer } from "../layers/SFdistrikterLayer.js";

useGeographic();

const map = new Map({
    view: new View({
        center: [10.7, 59.9],
        zoom: 12,
    }),
    layers: [new TileLayer({ source: new OSM() }), tilfluktsromLayer, SFdistrikterLayer],
});

const hoverStyle = new Style({
    image: new CircleStyle({
        radius: 9,
        fill: new Fill({ color: "rgba(255, 200, 0, 0.9)" }),
        stroke: new Stroke({ color: "black", width: 2 }),
    }),
    stroke: new Stroke({ color: "rgba(255, 200, 0, 0.9)", width: 3 }),
    fill: new Fill({ color: "rgba(255, 200, 0, 0.25)" }),
});

export function Application() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [selectedProps, setSelectedProps] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        map.setTarget(mapRef.current!);

        let lastHover: any = null;

        map.on("pointermove", (evt) => {
            const hit = map.hasFeatureAtPixel(evt.pixel);
            map.getTargetElement().style.cursor = hit ? "pointer" : "";

            if (lastHover) {
                lastHover.setStyle(undefined);
                lastHover = null;
            }

            if (!hit) return;

            const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
            if (!feature) return;

            feature.setStyle(hoverStyle);
            lastHover = feature;
        });

        map.on("singleclick", (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
            if (!feature) {
                setSelectedProps(null);
                return;
            }

            const { geometry, ...rest } = feature.getProperties();
            setSelectedProps(rest);
        });
    }, []);

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

            <div
                style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 320,
                    maxHeight: "90vh",
                    overflow: "auto",
                    background: "rgba(0,0,0,0.75)",
                    color: "white",
                    padding: 12,
                    borderRadius: 8,
                }}
            >
                <h3 style={{ marginTop: 0 }}>Tilfluktsrom info</h3>
                {selectedProps ? (
                    <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(selectedProps, null, 2)}
          </pre>
                ) : (
                    <p>Klikk på et tilfluktsrom for detaljer.</p>
                )}
            </div>
        </div>
    );
}