import { jsdom } from 'jsdom'

var document = jsdom('<!doctype html><html><body></body></html>');

global.document = document;
global.window = document.defaultView
console.log(window.navigator);
global.navigator = global.window.navigator;
global.localStorage = {
  removeItem: function() {
    return;
  },
  getItem: function() {
    return 'madeUpToken';
  },
  setItem: function() {
    return;
  }
}
