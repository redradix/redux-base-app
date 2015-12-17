'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

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

var JSONArrayNode = (function (_React$Component) {
  _inherits(JSONArrayNode, _React$Component);

  function JSONArrayNode(props) {
    _classCallCheck(this, _JSONArrayNode);

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

  // Returns the child nodes for each element in the array. If we have
  // generated them previously, we return from cache, otherwise we create
  // them.

  JSONArrayNode.prototype.getChildNodes = function getChildNodes() {
    var _this = this;

    if (this.state.expanded && this.needsChildNodes) {
      (function () {
        var childNodes = [];
        _this.props.data.forEach(function (element, idx) {
          var prevData = undefined;
          if (typeof _this.props.previousData !== 'undefined' && _this.props.previousData !== null) {
            prevData = _this.props.previousData[idx];
          }
          var node = _grabNode2['default'](idx, element, prevData, _this.props.theme, _this.props.styles, _this.props.getItemString);
          if (node !== false) {
            childNodes.push(node);
          }
        });
        _this.needsChildNodes = false;
        _this.renderedChildren = childNodes;
      })();
    }
    return this.renderedChildren;
  };

  // Returns the "n Items" string for this node, generating and
  // caching it if it hasn't been created yet.

  JSONArrayNode.prototype.getItemString = function getItemString(itemType) {
    if (!this.itemString) {
      this.itemString = this.props.data.length + ' item' + (this.props.data.length !== 1 ? 's' : '');
    }
    return this.props.getItemString('Array', this.props.data, itemType, this.itemString);
  };

  JSONArrayNode.prototype.render = function render() {
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
          }, this.props.styles.getLabelStyle('Array', this.state.expanded)), onClick: this.handleClick.bind(this) },
        this.props.keyName,
        ':'
      ),
      _react2['default'].createElement(
        'span',
        { style: _extends({}, spanStyle, this.props.styles.getItemStringStyle('Array', this.state.expanded)), onClick: this.handleClick.bind(this) },
        this.getItemString(_react2['default'].createElement(
          'span',
          { style: styles.spanType },
          '[]'
        ))
      ),
      _react2['default'].createElement(
        'ol',
        { style: _extends({}, childListStyle, this.props.styles.getListStyle('Array', this.state.expanded)) },
        childNodes
      )
    );
  };

  var _JSONArrayNode = JSONArrayNode;
  JSONArrayNode = _reactMixin2['default'].decorate(_mixins.ExpandedStateHandlerMixin)(JSONArrayNode) || JSONArrayNode;
  return JSONArrayNode;
})(_react2['default'].Component);

exports['default'] = JSONArrayNode;
module.exports = exports['default'];

// flag to see if we still need to render our child nodes

// cache store for our child nodes

// cache store for the number of items string we display