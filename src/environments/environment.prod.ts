export const environment = {
  production: true,
  cacheTTL: 31,
  // eslint-disable-next-line max-len
  dogzonesAPI:
    'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:HUNDEZONEOGD&srsName=EPSG:4326&outputFormat=json',
  // eslint-disable-next-line max-len
  waterfountainsAPI:
    'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRINKBRUNNENOGD&srsName=EPSG:4326&outputFormat=json',
  // eslint-disable-next-line max-len
  poobagAPI:
    'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:HUNDESACKERLOGD&srsName=EPSG:4326&outputFormat=json',
};
