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

var timeline_container = document.getElementById('wrapper');

var campaigns = data.map((d,i) => {
  return d;
});

function clicked() {
  console.log(data[0].campaign)

}
