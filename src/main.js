import './styles.scss'
import mapDiv from './map.html'
import timeline from './timeline.html'
import _ from 'lodash'
import showdown from 'showdown'

const converter = new showdown.Converter()

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
const SITES_LAYER = 'new-zealand-wars-sites-v2'
const MAP_BOUNDS = [[172.4, -41.8], [178.7, -34.0]]

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nzherald/cj96ajiksp9vb2rt3hx754ij4',
  maxBounds: [[167.3, -41.8],[183.8, -34]],
  minZoom: 4.8,
  maxZoom: 18
});


map.on('click', SITES_LAYER, ({features}) => {

  if (features.length) {
    var feature = features[0];
    infobox.innerHTML = getInfoHTML(feature.properties);
  }
});

const getInfoHTML = ({location, text, date}) => {
  var container = document.createElement('div');
  container.className = 'site';

  var title = document.createElement('h3');
  title.textContent = location;

  var when = document.createElement('span');
  when.className = 'when'
  when.textContent = date;

  var description = document.createElement('div');
  description.innerHTML = converter.makeHtml(text || "")

  container.appendChild(title);
  container.appendChild(when);
  container.appendChild(description);

  return container.outerHTML;

}



const campaigns = $('.campaign');
campaigns.on("click", ({target}) => {
  const $target = $(target)
  const label = $target.data('label') || $target.text().trim();
  infobox.innerHTML = `<div class="site"><h3>${label}</h3></div>`
  if (map.getFilter(SITES_LAYER)) {
    map.setFilter(SITES_LAYER, null)
    map.fitBounds(MAP_BOUNDS)
  } else {
    map.setFilter(SITES_LAYER, ['==', 'conflict', $target.data("conflict")])
    map.fitBounds($target.data("bbox"))
  }
})



