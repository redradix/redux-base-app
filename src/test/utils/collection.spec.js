import expect from "expect"
import * as _ from "../../utils/collection"
import deepFreeze from "deep-freeze"

describe("Array collections", () => {

  const collection = [{id:0, thing:"car"}, {id:6, thing:"button"}];

  deepFreeze(collection);

  it("should add a new element", () => {
    const newCollection = [{id:0, thing:"car"}, {id:6, thing:"button"},{thing:"cloth"}];
    expect(
      _.addItem(collection, {thing:"cloth"})
    ).toEqual(newCollection);
  });

  it("should add a new element specifying an index", () => {
    const newCollection = [{id:0, thing:"car"}, {id:6, thing:"button"},{thing:"cloth"}];
    expect(
      _.addItem(collection, {thing:"cloth"}, 3)
    ).toEqual(newCollection);
  });

  it("should add a new element by id without specifying an id", () => {
    const newCollection = [{id:0, thing:"car"}, {id:6, thing:"button"},{id:7, thing:"cloth"}];
    expect(
      _.addItemById(collection, {thing:"cloth"})
    ).toEqual(newCollection);
  });

  it("should add a new element by id specifying its id", () => {
    const newCollection = [{id:0, thing:"car"}, {id:6, thing:"button"},{id:4, thing:"cloth"}];
    expect(
      _.addItemById(collection, {thing:"cloth"}, 4)
    ).toEqual(newCollection);
  });

  it("should add a new element by id specifying an id different from the one the element has", () => {
    const newCollection = [{id:0, thing:"car"}, {id:6, thing:"button"},{id:4, thing:"cloth"}];
    expect(
      _.addItemById(collection, {id:3, thing:"cloth"}, 4)
    ).toEqual(newCollection);
  });

  it("shouldn't remove any element if no index is specified", () => {
    expect(
      _.removeItem(collection)
    ).toEqual(collection);
  });

  it("should remove an element specifying its index", () => {
    const newCollection = [{id:0, thing:"car"}];
    expect(
      _.removeItem(collection, 1)
    ).toEqual(newCollection);
  });

  it("shouldn't remove an element if no id is specified", () => {
    expect(
      _.removeItemById(collection)
    ).toEqual(collection);
  });

  it("should remove an element by its id", () => {
    const newCollection = [{id:0, thing:"car"}];
    expect(
      _.removeItemById(collection, 6)
    ).toEqual(newCollection);
  });

});

describe("Map collection", () => {
  const collection = {"0":{thing:"car"}, "1":{thing:"button"}};

  deepFreeze(collection);

  it("shouln't add an element if no key is specified", () => {
    expect(
      _.addItem(collection, {thing:"cloth"})
    ).toEqual(collection);
  });

  it("should add an element when its key is specified", () => {
    const newCollection = {"0":{thing:"car"}, "1":{thing:"button"}, "3":{thing:"cloth"}};
    expect(
      _.addItem(collection, {thing:"cloth"}, 3)
    ).toEqual(newCollection);
  });

  it("shouldn't add an element if no id is specified", () => {
    expect(
      _.addItemById(collection, {thing:"cloth"})
    ).toEqual(collection);
  });

  it("should add an element when its id is specified", () => {
    const newCollection = {"0":{thing:"car"}, "1":{thing:"button"}, "3":{thing:"cloth"}};
    expect(
      _.addItemById(collection, {thing:"cloth"}, 3)
    ).toEqual(newCollection);
  });

  it("shouldn't remove any element when no key is specified", () => {
    expect(
      _.removeItem(collection)
    ).toEqual(collection);
  });

  it("should remove an item specified by its key", () => {
    const newCollection = {"0":{thing:"car"}};
    expect(
      _.removeItem(collection, 1)
    ).toEqual(newCollection);
  });

  it("shouldn't remove any item when no id is specified", () => {
    expect(
      _.removeItemById(collection)
    ).toEqual(collection);
  });

  it("should remove an item when its id is specified", () => {
    const newCollection = {"0":{thing:"car"}};
    expect(
      _.removeItemById(collection, 1)
    ).toEqual(newCollection);
  });
});
