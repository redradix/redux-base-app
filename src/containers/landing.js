import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DevTools from '../containers/dev-tools';


class Landing extends Component {
  render() {
    return (
      <div>
        <div style={{marginTop: '1.5em'}}>{this.props.children}</div>
        <DevTools/>
      </div>
    );
  }
}

Landing.propTypes = {
  children: PropTypes.element
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
