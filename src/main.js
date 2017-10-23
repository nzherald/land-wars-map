import './styles.scss'

var data = [
  {
    "campaign": "Wairau",
    "year": "1843"
  },
  {
    "campaign": "Northern Wars",
    "year": "1845"
  },
  {
    "campaign": "Hutt Valley",
    "year": "1846"
  },
  {
    "campaign": "Taranaki",
    "year": "1860"
  },
  {
    "campaign": "Waikato",
    "year": "1863-64"
  },
  {
    "campaign": "East Coast",
    "year": "1865-67"
  },
  {
    "campaign": "South Taranaki",
    "year": "1865-69"
  },
  {
    "campaign": "Te Kooti",
    "year": "1868-72"
  },
];

mapboxgl.accessToken = 'pk.eyJ1IjoibnpoZXJhbGQiLCJhIjoiSVBPNHM0cyJ9.PDW_j3xU8w-wTnKCpnshPg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nzherald/cj8m6wwle6m9l2snw7oolbmbz',
  center: [172.885971, -41.300557],
  minZoom: 4.8,
  maxZoom: 16
});

map.on('click', function(e) {

  var infobox = document.getElementById('info-box');

  var features = map.queryRenderedFeatures(e.point, {
    layers: ['land-wars-dk69ct']
  });

  if (features.length) {
      var feature = features[0];
      infobox.innerHTML = getInfoHTML(feature.properties.location);
  }

  console.log(features[0].properties.location)

});

function getInfoHTML(properties) {
    var container = document.createElement('div');
        container.className = 'site';

    var title = document.createElement('h3');
        title.textContent = properties;

    var description = document.createElement('p');
        description.textContent = "Placeholder text";

    container.appendChild(title);
    container.appendChild(description);

    return container.outerHTML;

}


// GOOGLE MAPS API KEY
// AIzaSyC5r8clGDZf-Gaw8uEbNTcKOtKYrYL0ERo
