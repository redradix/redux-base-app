export const assign = (state, newState = {}) => Object.assign({}, state, newState);

/**
 * Arrays
 */
function addArrayItem(collection, item = {}, index = collection.length) {
  return [
    ...collection.slice(0, index), 
    item, 
    ...collection.slice(index)
  ];
}

function removeArrayItem(collection, index = collection.length) {
  return [
    ...collection.slice(0, index),
    ...collection.slice(index + 1)
  ];
}

function removeArrayItemById(collection, id) {
  for (var i=0; i < collection.length; i++) {
    if (collection[i].id === id) return removeArrayItem(collection, i);
  };
  return collection;
}

/**
 * Objects
 */
function addMapItem(collection, item, index) {
  // what if no index??
  return index? assign({}, collection, { [index]: item }) : collection;
}

function removeMapItemByKey(collection, key) {
  return assign(collection, { [key]: undefined });
}

/**
 * Utils
 */
function isArray(collection) {
  return collection instanceof Array;
}

function getNextId(collection = []) {
  return collection.reduce((maxId, item) => {
    let id = item.id || maxId;
    return Math.max(maxId, id);
  }, -1) + 1;
}

function id2index(collection = [], id) {
  return collection.reduce((index, item, i) => item.id === id? i : index, undefined);
}

function index2id(collection = [], index) {
  let item = collection[index];
  return item && item.id;
}

/**
 * exports
 */
export function addItem(collection, item, index) {
  return isArray(collection) ?
    addArrayItem(...arguments) :
    addMapItem(...arguments);
}

export function addItemById(collection, item, id) {
  return isArray(collection) ?
    addArrayItem(collection, { id: id || getNextId(collection), ...item }) :
    addMapItem(...arguments);
}

export function removeItem(collection, index) {
  return isArray(collection) ?
    removeArrayItem(...arguments) :
    removeMapItemByKey(...arguments);
};

export function removeItemById(collection, id) {
  return isArray(collection) ?
    removeArrayItemById(...arguments) :
    removeMapItemByKey(...arguments);
};
