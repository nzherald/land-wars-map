import './styles.scss'
import mapDiv from './map.html'
import timeline from './timeline.html'

import campaignText from './campaigns.yaml'

const converter = new showdown.Converter({openLinksInNewWindow: true})

const app = document.getElementById('app')
app.innerHTML = mapDiv + timeline


var infobox = document.getElementById('info-box');

mapboxgl.accessToken = 'pk.eyJ1IjoibnpoZXJhbGQiLCJhIjoiSVBPNHM0cyJ9.PDW_j3xU8w-wTnKCpnshPg';
const SITES_LAYER = 'new-zealand-wars-sites-v10'
const MAP_BOUNDS = [[172.4, -41.8], [178.7, -34.0]]

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nzherald/cj99b8b372b5w2sthr1j9otpg',
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
    $('.infobox-container').removeClass('close-infobox');
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
  const filter = map.getFilter(SITES_LAYER)
  $('.infobox-container').removeClass('close-infobox');
  $('.timeline-wrapper').removeClass('open-menu');
  $('.icon-img').removeClass('rotate-icon');
  campaigns.removeClass('selected');
  if (filter && filter[2] == campaignId) {
    map.setFilter(SITES_LAYER, null)
    map.fitBounds(MAP_BOUNDS)
  } else {
    map.setFilter(SITES_LAYER, ['==', 'campaign', campaignId])
    map.fitBounds(campaign.bbox)
    $(currentTarget).addClass('selected');
  }
})

const menu_arrow = $('.arrow-icon');
const close_icon = $('.close-icon');
const campaign_btn = $('.campaign');

menu_arrow.on("click", () => {
  $('.timeline-wrapper').toggleClass('open-menu');
  $('.icon-img').toggleClass('rotate-icon');
});

close_icon.on("click", () => {
  $('.infobox-container').addClass('close-infobox');
});
