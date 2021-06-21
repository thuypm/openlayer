import React from "react";
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { LineString, Point } from 'ol/geom';
import { getVectorContext } from 'ol/render';


class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.mapViewRef = React.createRef();
        this.state = {
            isChecking: false,
        };
        this.map = null;
    }

    async componentDidMount() {
        var count = 20000;
        var features = new Array(count);
        var e = 18000000;
        for (var i = 0; i < count; ++i) {
            features[i] = new Feature({
                'geometry': new Point([
                    2 * e * Math.random() - e,
                    2 * e * Math.random() - e]),
                'i': i,
                'size': i % 2 ? 10 : 20,
            });
        }

        var styles = {
            '10': new Style({
                image: new CircleStyle({
                    radius: 5,
                    fill: new Fill({ color: '#666666' }),
                    stroke: new Stroke({ color: '#bada55', width: 1 }),
                }),
            }),
            '20': new Style({
                image: new CircleStyle({
                    radius: 10,
                    fill: new Fill({ color: '#666666' }),
                    stroke: new Stroke({ color: '#bada55', width: 1 }),
                }),
            }),
        };

        var vectorSource = new VectorSource({
            features: features,
            wrapX: false,
        });
        var vector = new VectorLayer({
            source: vectorSource,
            style: function (feature) {
                return styles[feature.get('size')];
            },
        });

        this.map  = new Map({
            layers: [vector],
            target: document.getElementById('ol-map'),
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });

      
    }
    async componentWillUnmount() {

    }

    render() {
        return <div>
            <div id="ol-map" style={{ height: "95vh", width: "100%" }}>

            </div>
        </div>


    }
}

export default MapView
