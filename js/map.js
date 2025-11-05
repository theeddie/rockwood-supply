// Initialize map centered on San Antonio
const map = L.map('map', {
    scrollWheelZoom: false,
    doubleClickZoom: true,
    dragging: true,
    touchZoom: true
}).setView([29.4241, -98.4936], 10);

// Enable scroll zoom only when user clicks on the map
map.on('click', function() {
    if (!map.scrollWheelZoom.enabled()) {
        map.scrollWheelZoom.enable();
        document.getElementById('map').classList.add('scroll-enabled');
    }
});

// Disable scroll zoom when mouse leaves the map
map.on('mouseout', function() {
    map.scrollWheelZoom.disable();
    document.getElementById('map').classList.remove('scroll-enabled');
});

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Approximate coordinates for Loop 1604
// These are approximate points around the 1604 loop
const loop1604Coords = [
    [29.7150, -98.3900], // North
    [29.7100, -98.3200], // Northeast
    [29.6500, -98.2800], // East
    [29.5500, -98.2900], // Southeast
    [29.4500, -98.3500], // South
    [29.3800, -98.4200], // Southwest
    [29.3500, -98.5500], // Southwest
    [29.3700, -98.6500], // West
    [29.4500, -98.7200], // Northwest
    [29.5800, -98.7000], // Northwest
    [29.6800, -98.6200], // North
    [29.7150, -98.5000], // North
    [29.7150, -98.3900]  // Close the loop
];

// Create the standard delivery area (inside 1604)
const standardArea = L.polygon(loop1604Coords, {
    color: '#4a6b4f',
    fillColor: '#4a6b4f',
    fillOpacity: 0.3,
    weight: 3
}).addTo(map);

standardArea.bindPopup('<strong>Standard Delivery Area</strong><br>Inside Loop 1604');

// Calculate the center of the 1604 polygon for the extended delivery circle
const centerLat = 29.5;
const centerLng = -98.49;

// Create extended delivery area as a 10-mile buffer around the standard area
// We'll create a larger polygon that encompasses everything within 10 miles of 1604
// 10 miles ≈ 0.145 degrees latitude (at this latitude)
const extendedRadius = 0.23; // Approximate 10 miles in degrees

// Generate points for outer circle (10 miles from center)
const extendedCircleCoords = [];
const numPoints = 64;
for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const lat = centerLat + (extendedRadius * Math.cos(angle));
    const lng = centerLng + (extendedRadius * Math.sin(angle) / Math.cos(centerLat * Math.PI / 180));
    extendedCircleCoords.push([lat, lng]);
}
extendedCircleCoords.push(extendedCircleCoords[0]); // Close the circle

const extendedArea = L.polygon(extendedCircleCoords, {
    color: '#e8772e',
    fillColor: '#e8772e',
    fillOpacity: 0.15,
    weight: 2,
    dashArray: '5, 10'
}).addTo(map);

extendedArea.bindPopup('<strong>Extended Delivery Area</strong><br>Up to 10 miles from Loop 1604<br>(Additional fee applies)');

// Add business location marker
const businessLocation = L.marker([29.6396, -98.4536], {
    icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
}).addTo(map);

businessLocation.bindPopup('<strong>RockWood Supply Co.</strong><br>4070 FM 1863<br>Bulverde, TX<br><a href="tel:2108541362">(210) 854-1362</a>');

// Add legend
const legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'map-legend');
    div.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            <h4 style="margin: 0 0 10px 0; color: #3d2817;">Delivery Areas</h4>
            <div style="margin-bottom: 5px;">
                <span style="display: inline-block; width: 20px; height: 20px; background: rgba(74, 107, 79, 0.3); border: 2px solid #4a6b4f; margin-right: 5px;"></span>
                <span>Standard Delivery (Inside 1604)</span>
            </div>
            <div>
                <span style="display: inline-block; width: 20px; height: 20px; background: rgba(232, 119, 46, 0.2); border: 2px dashed #e8772e; margin-right: 5px;"></span>
                <span>Extended Delivery (+fee)</span>
            </div>
        </div>
    `;
    return div;
};

legend.addTo(map);

// Add company name overlay
const titleControl = L.control({position: 'topleft'});

titleControl.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'map-title');
    div.innerHTML = `
        <div style="background: rgba(61, 40, 23, 0.9); padding: 15px 20px; border-radius: 5px; color: white;">
            <h3 style="margin: 0; color: #e8772e; font-size: 1.2rem;">ROCKWOOD SUPPLY CO.</h3>
            <p style="margin: 5px 0 0 0; font-size: 0.9rem;">Delivery Coverage Area</p>
        </div>
    `;
    return div;
};

titleControl.addTo(map);
