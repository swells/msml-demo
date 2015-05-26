var ui = {
    /* Bind functions and values */
    ready: function() {

    },

    onEachFeatureHandler: function(feature, layer) {
        layer.bindPopup(feature.properties['Name.x'] + '<br>' + feature.properties.City);
    },

    pointToLayerHandler: function(feature, latlng) {
        var CLUSTER_COLORS = {
            1: '#ff7800',
            2: '#FF2E24',
            3: '#B5E6FF',
            4: '#EBFF99',
            5: '#663399',
        };

        return L.circleMarker(latlng, {
            radius: 8,
            fillColor: CLUSTER_COLORS[feature.properties.cluster],
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
        });
    }
};
