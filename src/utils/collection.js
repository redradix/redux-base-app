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

function replaceArrayItem(collection, item, index) {
  let newCollection = removeArrayItem(collection, index);
  return index != undefined? 
    addArrayItem(newCollection, item, index) :
    newCollection;
}

/**
 * Objects
 */
function addMapItem(collection, item, index) {
  return index != undefined? assign(collection, { [index]: item }) : collection;
}

function removeMapItem(collection, key) {
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

function isPlainObject(collection) {
  return collection.toString() === "[object Object]";
}

function getNextId(collection = []) {
  return collection.reduce((maxId, item) => {
    let id = item.id || maxId;
    return Math.max(maxId, id);
  }, -1) + 1;
}

function id2index(collection = [], id) {
  for (var i=0; i < collection.length; i++) {
    if (collection[i].id === id) return i;
  };
}

function index2id(collection = [], index) {
  let item = collection[index];
  return item && item.id;
}

/**
 * exports
 */
export function addItem(collection, item, index) {
  if (isArray(collection)) { 
    return addArrayItem(...arguments) 
  } else if (isPlainObject(collection)) {
    return addMapItem(...arguments);
  } else {
    throw new Error("The collection must be either Object or Array");
  }
}

export function removeItem(collection, index) {
  if (isArray(collection)) { 
    return removeArrayItem(...arguments);
  } else if (isPlainObject(collection)) {
    return removeMapItem(...arguments);
  } else {
    throw new Error("The collection must be either Object or Array");
  }
};

export function replaceItem(collection, item, index) {
  if (isArray(collection)) { 
    return replaceArrayItem(...arguments); 
  } else if (isPlainObject(collection)) {
    return replaceMapItem(...arguments);
  } else {
    throw new Error("The collection must be either Object or Array");
  }
};
