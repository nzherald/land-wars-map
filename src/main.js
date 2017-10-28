import './styles.scss'
import mapDiv from './map.html'
import timeline from './timeline.html'

import campaignText from './campaigns.yaml'

const converter = new showdown.Converter({openLinksInNewWindow: true})

const app = document.getElementById('app')
app.innerHTML = mapDiv + timeline


var infobox = document.getElementById('info-box');

mapboxgl.accessToken = 'pk.eyJ1IjoibnpoZXJhbGQiLCJhIjoiSVBPNHM0cyJ9.PDW_j3xU8w-wTnKCpnshPg';
const SITES_LAYER = 'new-zealand-wars-sites-v15'
const MAP_BOUNDS = [[170, -44], [180, -31.0]]

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nzherald/cj9bny36c4hqq2spibuz11gvo',
  maxBounds: [[167.3, -41.8],[183.8, -34]],
  center: [176.386231, -38.106439],
  zoom: 5,
  minZoom: 3,
  maxZoom: 18
});


map.on('click', SITES_LAYER, ({features}) => {

  if (features.length) {
    var feature = features[0];
    infobox.innerHTML = getInfoHTML(feature.properties);
    $('.infobox-container').removeClass('close-infobox');
    $('.instructions').addClass('inactive');
  }

});



map.on('mouseenter', SITES_LAYER, (e) => {
  map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', SITES_LAYER, () => {
  map.getCanvas().style.cursor = '';
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


const campaigns = $('.campaign');
campaigns.on("click", ({currentTarget}) => {
  const campaignId = $(currentTarget).attr("id")
  const campaign = campaignText[campaignId]
  const selected = $(currentTarget).hasClass('selected')
  campaigns.removeClass('selected');
  if (!campaign) { return }
  infobox.innerHTML = converter.makeHtml(campaign.text)
  $('.infobox-container').removeClass('close-infobox');
  $('.instructions').addClass('inactive');
  $('.timeline-wrapper').removeClass('open-menu');
  $('.icon-img').removeClass('rotate-icon');
  if (selected) {
    map.fitBounds(MAP_BOUNDS)
  } else {
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
  $('.instructions').removeClass('inactive');
});
