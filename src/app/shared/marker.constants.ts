import * as L from 'leaflet';

const iconTemplate = L.Icon.extend({
  options: {
    iconSize: [30, 80],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
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
