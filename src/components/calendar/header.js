// header.js
// header.js
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

// const generateCell = (value, key) => { return (<th style={styles.th} key={key}>{value}</th>) };

class Header extends Component {
  
  _renderWeekDayNames(){
    let names = [];
    for( let i = 0; i < 7; i++) { 
      // names.push( generateCell( moment().weekday(i).format('ddd'), i) ); 
      names.push( (<th style={styles.th} key={i}>{moment().weekday(i).format('ddd')}</th>) );
    }
    return names;
  }

  render() {
    const { onPrevMonthClick, currentDate, onNextMonthClick} = this.props;
    return( 
      <thead>
        <tr>
          <th style={styles.th}><button onClick={onPrevMonthClick}>Prev</button></th>
          <th style={styles.th} colSpan='5' >{ moment(currentDate).format('MMMM / YYYY') }</th>
          <th style={styles.th}><button onClick={onNextMonthClick}>Next</button></th>
        </tr>
        <tr>
          { this._renderWeekDayNames() }
        </tr>
      </thead>
    );
  }
}

Header.propTypes = {
  onPrevMonthClick: PropTypes.func.isRequired,
  onNextMonthClick: PropTypes.func.isRequired,
  currentDate: PropTypes.number,
}

const styles = {
  th: {
    textAlign: 'center',
    verticalAlign: 'bottom',
    borderBottom: '2px solid #ddd',
    padding: 8,
    lineHeight: '1.42857143',
    borderTop: '1px solid #ddd',
  }
}

export default Header;