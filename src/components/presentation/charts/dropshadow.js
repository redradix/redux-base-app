import React, { Component } from 'react'

class DropShadow extends Component {
  render() {
    return (
      <filter id='dropshadow' x='-10%' y='-10%' width='120%' height='120%'>
        <feGaussianBlur in='SourceAlpha' result='blur-out' stdDeviation='2' />
        <feOffset in='blur-out' result='offset-out' dx='0' dy='0' />
        <feColorMatrix in='offset-out' result='color-out' type='matrix'
          values='0 0 0 0  0
                  0 0 0 0  0
                  0 0 0 0  0
                  0 0 0 .3 0'/>
        <feBlend in='SourceGraphic' in2='color-out' mode='normal' />
      </filter>
    )
  }
}

DropShadow.propTypes = {}

export default DropShadow
