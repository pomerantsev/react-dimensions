'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = Dimensions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var style = {
  width: '100%',
  height: '100%',
  padding: 0,
  border: 0
};

function defaultGetWidth(element) {
  return element.clientWidth;
}

function defaultGetHeight(element) {
  return element.clientHeight;
}

/**
 * Wraps a react component and adds properties `containerHeight` and
 * `containerWidth`. Useful for responsive design. Properties update on
 * window resize. **Note** that the parent element must have either a
 * height or a width, or nothing will be rendered
 *
 * Can be used as a
 * [higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
 * or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
 * (see examples)
 *
 * v1.0.0 is for React v0.14 only. Use ^0.1.0 for React v0.13
 *
 * @param {object} [options] Options
 * @param {function} [options.getHeight] `getHeight(element)` should return element
 * height, where element is the wrapper div. Defaults to `element.clientHeight`
 * @param {function} [options.getWidth]  `getWidth(element)` should return element
 * width, where element is the wrapper div. Defaults to `element.clientWidth`
 * @return {function}                   Returns a higher-order component that can be
 * used to enhance a react component `Dimensions()(MyComponent)`
 *
 * ### Live Example
 *
 * Will open a browser window for localhost:9966
 *
 * `npm i && npm i react react-dom && npm start`
 *
 * @example
 * // ES2015
 * import React from 'react'
 * import Dimensions from 'react-dimensions'
 *
 * class MyComponent extends React.Component {
 *   render() (
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )
 * }
 *
 * export default Dimensions()(MyComponent) // Enhanced component
 *
 * @example
 * // ES5
 * var React = require('react')
 * var Dimensions = require('react-dimensions')
 *
 * var MyComponent = React.createClass({
 *   render: function() {(
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )}
 * }
 *
 * module.exports = Dimensions()(MyComponent) // Enhanced component
 *
 */

function Dimensions() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$getHeight = _ref.getHeight;
  var getHeight = _ref$getHeight === undefined ? defaultGetHeight : _ref$getHeight;
  var _ref$getWidth = _ref.getWidth;
  var getWidth = _ref$getWidth === undefined ? defaultGetWidth : _ref$getWidth;

  return function (ComposedComponent) {
    return (function (_React$Component) {
      _inherits(DimensionsHOC, _React$Component);

      function DimensionsHOC() {
        var _this = this;

        _classCallCheck(this, DimensionsHOC);

        _React$Component.apply(this, arguments);

        this.state = {};

        this.updateDimensions = function () {
          var container = _this.refs.container;
          if (!container) {
            throw new Error('Cannot find container div');
          }

          var containerWidth = getWidth(container);
          var containerHeight = getHeight(container);

          if (containerWidth !== _this.state.containerWidth || containerHeight !== _this.state.containerHeight) {
            _this.setState({ containerWidth: containerWidth, containerHeight: containerHeight });
          }
        };

        this.onResize = function () {
          if (_this.rqf) return;
          _this.rqf = window.requestAnimationFrame(function () {
            _this.rqf = null;
            _this.updateDimensions();
          });
        };
      }

      DimensionsHOC.prototype.componentDidMount = function componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.onResize, false);
      };

      DimensionsHOC.prototype.componentDidUpdate = function componentDidUpdate() {
        this.updateDimensions();
      };

      DimensionsHOC.prototype.componentWillUnmount = function componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
      };

      DimensionsHOC.prototype.render = function render() {
        return _react2['default'].createElement(
          'div',
          { style: style, ref: 'container' },
          (this.state.containerWidth || this.state.containerHeight) && _react2['default'].createElement(ComposedComponent, _extends({}, this.state, this.props, { updateDimensions: this.updateDimensions }))
        );
      };

      return DimensionsHOC;
    })(_react2['default'].Component);
  };
}

module.exports = exports['default'];

// ES7 Class properties
// http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers

// Using arrow functions and ES7 Class properties to autobind
// http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#arrow-functions
