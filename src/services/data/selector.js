import getStore from 'store';

export const getContainer = (id) => {
    const containers = getStore().getState().data.containers;
    const res = containers.filter(c => {
        return c.id === id;
    });
    return res[0];
};

export default () => {
    return getStore().getState().data;
}