export const environment = {
  production: true,
  cacheTTL: 31,
  version: '0.2.1-0',
  dogzonesAPI:
    // eslint-disable-next-line max-len
    'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:HUNDEZONEOGD&srsName=EPSG:4326&outputFormat=json',
  waterfountainsAPI:
    // eslint-disable-next-line max-len
    'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRINKBRUNNENOGD&srsName=EPSG:4326&outputFormat=json',
  poobagAPI:
    // eslint-disable-next-line max-len
    'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:HUNDESACKERLOGD&srsName=EPSG:4326&outputFormat=json',
};
