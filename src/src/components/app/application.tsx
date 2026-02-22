import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile.js";
import { OSM } from "ol/source.js";
import { useGeographic } from "ol/proj.js";


import "ol/ol.css";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import {GeoJSON} from "ol/format.js";
import {tilfluktsromLayer} from "../layers/tilfluktsromLayer.js";


useGeographic();


const map = new Map({
    view: new View({
        center: [10.7, 59.9],
        zoom: 12
    }),
    layers: [
        new TileLayer({ source: new OSM() }),
        tilfluktsromLayer
    ],
});


const tilfluktsrom = new VectorLayer ({
    source: new VectorSource({
        url: "/Arbeidskrav-KartbasertWebV26/tilfluktsrom.geojson",
        format: new GeoJSON(),
    })
});


export function Application() {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        map.setTarget(mapRef.current!);
    }, []);

    return <div ref={mapRef} style={{ width: "100%", height: "100vh" }}></div>;
}