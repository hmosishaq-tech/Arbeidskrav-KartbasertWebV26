import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { GeoJSON } from "ol/format.js";
import { Circle, Fill, Stroke, Style, Text } from "ol/style.js";

import type { FeatureLike } from "ol/Feature.js";


interface tilfluktsromProperties {
    plasser: number;
    romnr: number;
    adresse: String;
}

function tilfluktsStyle(feature: FeatureLike) {
    console.log(feature);

    const props = feature.getProperties() as tilfluktsromProperties;

    return new Style({
        image: new Circle({
            radius: 3 + props.plasser/1000,
            stroke: new Stroke({width: 2, color: "black"}),
            fill: new Fill({ color: "red" }),
        }),
    })
}
export const tilfluktsromLayer = new VectorLayer({
    source: new VectorSource({
        url: "/tilfluktsrom.geojson",
        format: new GeoJSON(),
    }),
    style: tilfluktsStyle,
});
