import './styles.scss'
import mapDiv from './map.html'
import timeline from './timeline.html'
import _ from 'lodash'
import showdown from 'showdown'

const converter = new showdown.Converter()

const app = document.getElementById('app')
app.innerHTML = mapDiv + timeline


var infobox = document.getElementById('info-box');

mapboxgl.accessToken = 'pk.eyJ1IjoibnpoZXJhbGQiLCJhIjoiSVBPNHM0cyJ9.PDW_j3xU8w-wTnKCpnshPg';
const SITES_LAYER = 'new-zealand-wars-sites-v2'
const MAP_BOUNDS = [[172.4, -41.8], [178.7, -34.0]]

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nzherald/cj97itj120m932sta477nqeso',
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
  description.className = 'site-description'
  description.innerHTML = converter.makeHtml(text || "")

  container.appendChild(title);
  container.appendChild(when);
  container.appendChild(description);

  return container.outerHTML;
}

window.map = map
map.on("click", e => console.log(e.latLng.lat, e.latLng.lng))

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
