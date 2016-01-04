export function formatDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function pluralize(s) {
  return s + 's'  
}

//TODO: Fix. Why the fuck I cannot call this getIndex neither indexOf ???
export function getIndice(id, collection) {
  return collection.reduce((acc, e, index) => {
    return e.id == id ? index : acc
  }, undefined) 
}

export function findById(id, collection) {
 return collection.find((e) => {return e.id == id}) || {} 
}
