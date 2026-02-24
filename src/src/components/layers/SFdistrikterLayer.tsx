import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { GeoJSON } from "ol/format.js";
import { Fill, Stroke, Style } from "ol/style.js";

const defaultStyle = new Style({
    stroke: new Stroke({
        color: "black",
        width: 3,
    }),
});

export const SFdistrikterLayer = new VectorLayer({
    source: new VectorSource({
        url: "/SFdistrikter.geojson",
        format: new GeoJSON(),
    }),
    style: defaultStyle,
});