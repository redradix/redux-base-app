import expect from 'expect';
import * as _ from '../../utils/collection';
import deepFreeze from 'deep-freeze';

describe('Array collections', () => {

  const collection = [{id: 0, thing: 'car'}, {id: 6, thing: 'button'}];

  deepFreeze(collection);

  /**
   * Add
   */
  it('should add a new element', () => {
    const newCollection = [{id: 0, thing: 'car'}, {id: 6, thing: 'button'}, {thing: 'cloth'}];
    expect(
      _.addItem(collection, {thing: 'cloth'})
    ).toEqual(newCollection);
  });

  it('should add a new element specifying an index', () => {
    const newCollection = [{id: 0, thing: 'car'}, {id: 6, thing: 'button'}, {thing: 'cloth'}];
    expect(
      _.addItem(collection, {thing: 'cloth'}, 3)
    ).toEqual(newCollection);
  });

  /**
   * Remove
   */
  it('shouldn\'t remove any element if no index is specified', () => {
    expect(
      _.removeItem(collection)
    ).toEqual(collection);
  });

  it('should remove an element specifying its index', () => {
    const newCollection = [{id: 0, thing: 'car'}];
    expect(
      _.removeItem(collection, 1)
    ).toEqual(newCollection);
  });

  /**
   * Replace
   */
  it('shouldn\'t replace any item when no index provided', () => {
    expect(
      _.replaceItem(collection, {thing: 'cloth'})
    ).toEqual(collection);
  });

  it('should replace an item given its index', () => {
    const newCollection = [{id: 0, thing: 'car'}, {thing: 'cloth'}];
    expect(
      _.replaceItem(collection, {thing: 'cloth'}, 1)
    ).toEqual(newCollection);
  });
});

describe('Map collection', () => {
  const collection = {'0': {thing: 'car'}, '6': {thing: 'button'}};

  deepFreeze(collection);

  /**
   * Add
   */
  it('shouln\'t add an element if no key is specified', () => {
    expect(
      _.addItem(collection, {thing: 'cloth'})
    ).toEqual(collection);
  });

  it('should add an element when its key is specified', () => {
    const newCollection = {'0': {thing: 'car'}, '6': {thing: 'button'}, '3': {thing: 'cloth'}};
    expect(
      _.addItem(collection, {thing: 'cloth'}, 3)
    ).toEqual(newCollection);
  });

  /**
   * Remove
   */
  it('shouldn\'t remove any element when no key is specified', () => {
    expect(
      _.removeItem(collection)
    ).toEqual(collection);
  });

  it('should remove an item specified by its key', () => {
    const newCollection = {'0': {thing: 'car'}};
    expect(
      _.removeItem(collection, 6)
    ).toEqual(newCollection);
  });

  /**
   * Replace
   */
  it('shouldn\'t replace any item when no key provided', () => {
    expect(
      _.replaceItem(collection, {thing: 'cloth'})
    ).toEqual(collection);
  });

  it('should replace an item given its key', () => {
    const newCollection = {'0': {thing: 'car'}, '6': {thing: 'cloth'}};
    expect(
      _.replaceItem(collection, {thing: 'cloth'}, 6)
    ).toEqual(newCollection);
  });
});
