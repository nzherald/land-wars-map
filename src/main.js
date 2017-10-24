import './styles.scss'
import mapDiv from './map.html'
import timeline from './timeline.html'
import _ from 'lodash'

const app = document.getElementById('app')
app.innerHTML = mapDiv + timeline

var campaign_coordinates = {
  'northern-war': {
    center: [173.934108, -35.423431],
    zoom: 8.26
  },
  'Hutt Valley': {
    center: [174.277684, -41.292357],
    zoom: 8.90
  },
  'Taranaki': {
    center: [175.100266, -39.298889],
    zoom: 9.19
  },
  'Waikato': {
    center: [175.100266, -39.298889],
    zoom: 9.19
  },
  'East Coast': {
    center: [175.100266, -39.298889],
    zoom: 9.19
  }
}

var infobox = document.getElementById('info-box');

mapboxgl.accessToken = 'pk.eyJ1IjoibnpoZXJhbGQiLCJhIjoiSVBPNHM0cyJ9.PDW_j3xU8w-wTnKCpnshPg';
const SITES_LAYER = 'new-zealand-wars-sites'
const MAP_BOUNDS = [[172.4, -41.8], [178.7, -34.0]]

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nzherald/cj8m6wwle6m9l2snw7oolbmbz',
  maxBounds: [[167.3, -41.8],[183.8, -34]],
  minZoom: 4.8,
  maxZoom: 18
});


map.on('click', SITES_LAYER, ({features}) => {

  if (features.length) {
    var feature = features[0];
    infobox.innerHTML = getInfoHTML(feature.properties.location);
  }
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

const campaigns = $('.campaign');
campaigns.on("click", ({target}) => {
  const $target = $(target)
  const label = $target.data('label') || $target.text().trim();
  infobox.innerHTML = getInfoHTML(label);
  if (map.getFilter(SITES_LAYER)) {
    map.setFilter(SITES_LAYER, null)
    map.fitBounds(MAP_BOUNDS)
  } else {
    map.setFilter(SITES_LAYER, ['==', 'area', $target.data("conflict")])
    map.fitBounds($target.data("bbox"))
  }
})
