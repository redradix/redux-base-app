export const assign = (state, newState = {}) => Object.assign({}, state, newState);

/**
 * Arrays
 */
function addArrayItem(collection, item = {}, index = collection.length, replace = false) {
  return [
    ...collection.slice(0, index), 
    item, 
    ...collection.slice(index + replace)
  ];
}

function removeArrayItem(collection, index = collection.length) {
  return [
    ...collection.slice(0, index),
    ...collection.slice(index + 1)
  ];
}

function removeArrayItemById(collection, id) {
  /*for (var i=0; i < collection.length; i++) {
    if (collection[i].id === id) return removeArrayItem(collection, i);
  };
  return collection;*/
  // better to use id2index
  return removeArrayItem(collection, id2index(collection, id));
}

function replaceArrayItem(collection, item, index) {
  let newCollection = removeArrayItem(collection, index);
  return index != undefined? 
    addArrayItem(newCollection, item, index) :
    newCollection;
}

function replaceArrayItemById(collection, item, id = item.id) {
  if (item.id == undefined || (item.id !== id)) item.id = id;
  let index = id2index(collection, id);
  return replaceArrayItem(collection, item, index);
}

/**
 * Objects
 */
function addMapItem(collection, item, index) {
  return index != undefined? assign(collection, { [index]: item }) : collection;
}

function removeMapItemByKey(collection, key) {
  let newCollection = assign(collection);
  if (key != undefined) {
    delete newCollection[key];
  }
  return newCollection;
}

function replaceMapItem(collection, item, key) {
  return key != undefined? assign(collection, { [key]: item }) : collection;
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
    addArrayItem(collection, { ...item, id: id || getNextId(collection) }) :
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

export function replaceItem(collection, item, index) {
  return isArray(collection) ?
    replaceArrayItem(...arguments) :
    replaceMapItem(...arguments);
}

export function replaceItemById(collection, item, id) {
  return isArray(collection) ?
    replaceArrayItemById(...arguments) :
    replaceMapItem(...arguments); 
}
