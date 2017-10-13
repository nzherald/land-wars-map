var data = [
  {
    "campaign": "Northern Wars",
    "year": "1845"
  },
  {
    "campaign": "Wairau",
    "year": "1843"
  }
];

mapboxgl.accessToken = 'pk.eyJ1IjoibnpoZXJhbGQiLCJhIjoiSVBPNHM0cyJ9.PDW_j3xU8w-wTnKCpnshPg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nzherald/cj8m6wwle6m9l2snw7oolbmbz',
  center: [172.885971, -41.300557],
  minZoom: 4.8,
  maxZoom: 16
});
