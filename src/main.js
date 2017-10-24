import './styles.scss'
import mapDiv from './map.html'
import timeline from './timeline.html'
import _ from 'lodash'

const app = document.getElementById('app')
app.innerHTML = mapDiv + timeline

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

var infobox = document.getElementById('info-box');

mapboxgl.accessToken = 'pk.eyJ1IjoibnpoZXJhbGQiLCJhIjoiSVBPNHM0cyJ9.PDW_j3xU8w-wTnKCpnshPg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nzherald/cj8m6wwle6m9l2snw7oolbmbz',
  center: [172.885971, -41.300557],
  minZoom: 4.8,
  maxZoom: 18
});

const SITES_LAYER = 'new-zealand-wars-sites'

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
  map.setFilter(SITES_LAYER, map.getFilter(SITES_LAYER) ? null : ['==', 'area', label])
})



