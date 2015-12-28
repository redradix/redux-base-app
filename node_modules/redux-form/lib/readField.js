'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _eventsCreateOnBlur = require('./events/createOnBlur');

var _eventsCreateOnBlur2 = _interopRequireDefault(_eventsCreateOnBlur);

var _eventsCreateOnChange = require('./events/createOnChange');

var _eventsCreateOnChange2 = _interopRequireDefault(_eventsCreateOnChange);

var _eventsCreateOnDragStart = require('./events/createOnDragStart');

var _eventsCreateOnDragStart2 = _interopRequireDefault(_eventsCreateOnDragStart);

var _eventsCreateOnDrop = require('./events/createOnDrop');

var _eventsCreateOnDrop2 = _interopRequireDefault(_eventsCreateOnDrop);

var _eventsCreateOnFocus = require('./events/createOnFocus');

var _eventsCreateOnFocus2 = _interopRequireDefault(_eventsCreateOnFocus);

var _silencePromise = require('./silencePromise');

var _silencePromise2 = _interopRequireDefault(_silencePromise);

var _read = require('./read');

var _read2 = _interopRequireDefault(_read);

var _updateField = require('./updateField');

var _updateField2 = _interopRequireDefault(_updateField);

var readField = function readField(_x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
  var _arguments = arguments;
  var _again = true;

  _function: while (_again) {
    var state = _x2,
        fieldName = _x3,
        pathToHere = _x4,
        fields = _x5,
        syncErrors = _x6,
        asyncValidate = _x7,
        isReactNative = _x8,
        props = _x9;
    if (pathToHere === undefined) pathToHere = '';
    _again = false;
    var callback = _arguments.length <= 8 || _arguments[8] === undefined ? function () {
      return null;
    } : _arguments[8];
    var asyncBlurFields = props.asyncBlurFields;
    var blur = props.blur;
    var change = props.change;
    var focus = props.focus;
    var form = props.form;
    var initialValues = props.initialValues;
    var readonly = props.readonly;
    var addArrayValue = props.addArrayValue;
    var removeArrayValue = props.removeArrayValue;

    var dotIndex = fieldName.indexOf('.');
    var openIndex = fieldName.indexOf('[');
    var closeIndex = fieldName.indexOf(']');
    if (openIndex > 0 && closeIndex !== openIndex + 1) {
      throw new Error('found [ not followed by ]');
    }
    if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
      var _ret = (function () {
        // array field
        var key = fieldName.substring(0, openIndex);
        var rest = fieldName.substring(closeIndex + 1);
        if (rest[0] === '.') {
          rest = rest.substring(1);
        }
        var stateArray = state && state[key] || [];
        if (!fields[key]) {
          fields[key] = [];
          Object.defineProperty(fields[key], 'addField', {
            value: function value(_value, index) {
              return addArrayValue(pathToHere + key, _value, index);
            }
          });
          Object.defineProperty(fields[key], 'removeField', {
            value: function value(index) {
              return removeArrayValue(pathToHere + key, index);
            }
          });
        }
        var fieldArray = fields[key];
        stateArray.forEach(function (fieldState, index) {
          if (rest && !fieldArray[index]) {
            fieldArray[index] = {};
          }
          var dest = rest ? fieldArray[index] : {};
          var result = readField(fieldState, rest, '' + pathToHere + key + '[' + index + ']' + (rest ? '.' : ''), dest, syncErrors, asyncValidate, isReactNative, props, callback);
          if (!rest) {
            // if nothing after [] in field name, assign directly to array
            fieldArray[index] = result;
          }
        });
        if (fieldArray.length > stateArray.length) {
          // remove extra items that aren't in state array
          fieldArray.splice(stateArray.length, fieldArray.length - stateArray.length);
        }
        return {
          v: fieldArray
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }
    if (dotIndex > 0) {
      // subobject field
      var key = fieldName.substring(0, dotIndex);
      var rest = fieldName.substring(dotIndex + 1);
      if (!fields[key]) {
        fields[key] = {};
      }
      _arguments = [_x2 = state[key] || {}, _x3 = rest, _x4 = pathToHere + key + '.', _x5 = fields[key], _x6 = syncErrors, _x7 = asyncValidate, _x8 = isReactNative, _x9 = props, callback];
      _again = true;
      callback = asyncBlurFields = blur = change = focus = form = initialValues = readonly = addArrayValue = removeArrayValue = dotIndex = openIndex = closeIndex = _ret = key = rest = undefined;
      continue _function;
    }
    var name = pathToHere + fieldName;
    var field = fields[fieldName] || {};
    if (field.name !== name) {
      var onChange = _eventsCreateOnChange2['default'](name, change, isReactNative);
      var initialValue = _read2['default'](name, initialValues);
      field.name = name;
      field.defaultChecked = initialValue === true;
      field.defaultValue = initialValue;
      field.initialValue = initialValue;
      if (!readonly) {
        field.onBlur = _eventsCreateOnBlur2['default'](name, blur, isReactNative, ~asyncBlurFields.indexOf(name) && function (blurName, blurValue) {
          return _silencePromise2['default'](asyncValidate(blurName, blurValue));
        });
        field.onChange = onChange;
        field.onDragStart = _eventsCreateOnDragStart2['default'](name, function () {
          return field.value;
        });
        field.onDrop = _eventsCreateOnDrop2['default'](name, change);
        field.onFocus = _eventsCreateOnFocus2['default'](name, focus);
        field.onUpdate = onChange; // alias to support belle. https://github.com/nikgraf/belle/issues/58
      }
      field.valid = true;
      field.invalid = false;
      Object.defineProperty(field, '_isField', { value: true });
    }

    var fieldState = (fieldName ? state[fieldName] : state) || {};
    var syncError = _read2['default'](name, syncErrors);
    var updated = _updateField2['default'](field, fieldState, name === form._active, syncError);
    if (fieldName || fields[fieldName] !== updated) {
      fields[fieldName] = updated;
    }
    callback(updated);
    return updated;
  }
};

exports['default'] = readField;
module.exports = exports['default'];