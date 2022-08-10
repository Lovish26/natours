/* eslint-disable */
const mapBox = document.getElementById('map');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  console.log(locations);

  mapboxgl.accessToken =
    'pk.eyJ1IjoibG92aXNoMjYiLCJhIjoiY2w1bms1Mmt5MTRsYzNjbWc5eHE5bXYzayJ9.uajQWUhUNV1VTlxJat-0DQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lovish26/cl5nkyu55000k15lnygm8k20u',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
}
