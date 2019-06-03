import getStore from 'store';

export const baseUrl = () => {
    return getStore().getState().config.baseUrl;
};

export const loadConfigUrl = (mapCode) => {
    return baseUrl() + 'system/2.0/config/';
};

export const loadMapUrl = (mapCode) => {
  return baseUrl() + 'container/2.0/map/' + mapCode + '/';
};

export const loadMapAddressUrl = (mapCode) => {
    return baseUrl() + 'get/map/address/?schema=' + mapCode + '&code=' + mapCode
};

export const loadContainersUrl = (mapId) => {
    return baseUrl() + 'container/2.0/' + mapId + '/descendants/';
};