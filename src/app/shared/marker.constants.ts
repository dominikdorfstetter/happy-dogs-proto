import * as L from 'leaflet';

const iconTemplate = L.Icon.extend({
  options: {
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  },
});

export const ICON_DOGGYBAG = new iconTemplate({
  iconUrl: '/assets/images/marker/poobag_pin.svg',
});
export const ICON_DOGZONE = new iconTemplate({
  iconUrl: '/assets/images/marker/dogzone_pin.svg',
});
export const ICON_WATERFOUNTAIN = new iconTemplate({
  iconUrl: '/assets/images/marker/water_pin.svg',
});
