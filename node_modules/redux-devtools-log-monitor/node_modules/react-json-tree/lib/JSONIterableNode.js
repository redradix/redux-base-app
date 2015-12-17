'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Number$isSafeInteger = require('babel-runtime/core-js/number/is-safe-integer')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _mixins = require('./mixins');

var _JSONArrow = require('./JSONArrow');

var _JSONArrow2 = _interopRequireDefault(_JSONArrow);

var _grabNode = require('./grab-node');

var _grabNode2 = _interopRequireDefault(_grabNode);

var styles = {
  base: {
    position: 'relative',
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 0,
    marginLeft: 14
  },
  label: {
    margin: 0,
    padding: 0,
    display: 'inline-block'
  },
  span: {
    cursor: 'default'
  },
  spanType: {
    marginLeft: 5,
    marginRight: 5
  }
};

var JSONIterableNode = (function (_React$Component) {
  _inherits(JSONIterableNode, _React$Component);

  function JSONIterableNode(props) {
    _classCallCheck(this, _JSONIterableNode);

    _React$Component.call(this, props);
    this.defaultProps = {
      data: [],
      initialExpanded: false
    };
    this.needsChildNodes = true;
    this.renderedChildren = [];
    this.itemString = false;
    this.state = {
      expanded: this.props.initialExpanded,
      createdChildNodes: false
    };
  }

  // Returns the child nodes for each entry in iterable. If we have
  // generated them previously, we return from cache, otherwise we create
  // them.

  JSONIterableNode.prototype.getChildNodes = function getChildNodes() {
    if (this.state.expanded && this.needsChildNodes) {
      var childNodes = [];
      for (var _iterator = this.props.data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var entry = _ref;

        var key = null;
        var value = null;
        if (Array.isArray(entry)) {
          key = entry[0];
          value = entry[1];
        } else {
          key = childNodes.length;
          value = entry;
        }

        var prevData = undefined;
        if (typeof this.props.previousData !== 'undefined' && this.props.previousData !== null) {
          prevData = this.props.previousData[key];
        }
        var node = _grabNode2['default'](key, value, prevData, this.props.theme, this.props.styles, this.props.getItemString);
        if (node !== false) {
          childNodes.push(node);
        }
      }
      this.needsChildNodes = false;
      this.renderedChildren = childNodes;
    }
    return this.renderedChildren;
  };

  // Returns the "n entries" string for this node, generating and
  // caching it if it hasn't been created yet.

  JSONIterableNode.prototype.getItemString = function getItemString(itemType) {
    if (!this.itemString) {
      var data = this.props.data;

      var count = 0;
      if (_Number$isSafeInteger(data.size)) {
        count = data.size;
      } else {
        for (var _iterator2 = data, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var entry = _ref2;
          // eslint-disable-line no-unused-vars
          count += 1;
        }
      }
      this.itemString = count + ' entr' + (count !== 1 ? 'ies' : 'y');
    }
    return this.props.getItemString('Iterable', this.props.data, itemType, this.itemString);
  };

  JSONIterableNode.prototype.render = function render() {
    var childNodes = this.getChildNodes();
    var childListStyle = {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      display: this.state.expanded ? 'block' : 'none'
    };
    var containerStyle = undefined;
    var spanStyle = _extends({}, styles.span, {
      color: this.props.theme.base0E
    });
    containerStyle = _extends({}, styles.base);
    if (this.state.expanded) {
      spanStyle = _extends({}, spanStyle, {
        color: this.props.theme.base03
      });
    }
    return _react2['default'].createElement(
      'li',
      { style: containerStyle },
      _react2['default'].createElement(_JSONArrow2['default'], { theme: this.props.theme, open: this.state.expanded, onClick: this.handleClick.bind(this), style: this.props.styles.getArrowStyle(this.state.expanded) }),
      _react2['default'].createElement(
        'label',
        { style: _extends({}, styles.label, {
            color: this.props.theme.base0D
          }, this.props.styles.getLabelStyle('Iterable', this.state.expanded)), onClick: this.handleClick.bind(this) },
        this.props.keyName,
        ':'
      ),
      _react2['default'].createElement(
        'span',
        { style: _extends({}, spanStyle, this.props.styles.getItemStringStyle('Iterable', this.state.expanded)), onClick: this.handleClick.bind(this) },
        this.getItemString(_react2['default'].createElement(
          'span',
          { style: styles.spanType },
          '()'
        ))
      ),
      _react2['default'].createElement(
        'ol',
        { style: _extends({}, childListStyle, this.props.styles.getListStyle('Iterable', this.state.expanded)) },
        childNodes
      )
    );
  };

  var _JSONIterableNode = JSONIterableNode;
  JSONIterableNode = _reactMixin2['default'].decorate(_mixins.ExpandedStateHandlerMixin)(JSONIterableNode) || JSONIterableNode;
  return JSONIterableNode;
})(_react2['default'].Component);

exports['default'] = JSONIterableNode;
module.exports = exports['default'];

// flag to see if we still need to render our child nodes

// cache store for our child nodes

// cache store for the number of items string we display