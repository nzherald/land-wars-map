import './styles.scss'
import mapDiv from './map.html'
import timeline from './timeline.html'

import campaignText from './campaigns.yaml'

const converter = new showdown.Converter({openLinksInNewWindow: true})

const app = document.getElementById('app')
app.innerHTML = mapDiv + timeline


var infobox = document.getElementById('info-box');

mapboxgl.accessToken = 'pk.eyJ1IjoibnpoZXJhbGQiLCJhIjoiSVBPNHM0cyJ9.PDW_j3xU8w-wTnKCpnshPg';
const SITES_LAYER = 'new-zealand-wars-sites-v7'
const MAP_BOUNDS = [[172.4, -41.8], [178.7, -34.0]]

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nzherald/cj98pm4z01q5a2sta3rmwxpbq',
  maxBounds: [[167.3, -41.8],[183.8, -34]],
  center: [176.386231, -38.106439],
  zoom: 5.8,
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
map.on("click", e => console.log(e.lngLat.lng, e.lngLat.lat))

const campaigns = $('.campaign');
campaigns.on("click", ({currentTarget}) => {
  const campaignId = $(currentTarget).attr("id")
  const campaign = campaignText[campaignId]
  if (!campaign) { return }
  infobox.innerHTML = converter.makeHtml(campaign.text)
  if (map.getFilter(SITES_LAYER)) {
    map.setFilter(SITES_LAYER, null)
    map.fitBounds(MAP_BOUNDS)
  } else {
    map.setFilter(SITES_LAYER, ['==', 'campaign', campaignId])
    map.fitBounds(campaign.bbox)
  }
})
