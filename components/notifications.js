import React, { PropTypes, Component } from 'react'
import Modal from 'react-modal'

/* Example of statefull component. Something we should avoid. One of the things we are using redux is to keep all the UI on the state, so if we reload or snapshoot the state we can recover completely
 */

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

function Notification({id, name, stock}) {
  return (
    <div>Ingredient {name} has currently {stock} units</div>
  )
}

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {modalIsOpen: false}
  }
  openModal() {
    this.setState({modalIsOpen: true})
  }
  closeModal() {
    this.setState({modalIsOpen: false})
  }
  render() {
    const { notifications } = this.props
    const hasElements = notifications.length > 0
    const list = !hasElements ? 
      <em>You don't have any notifications yet</em> :
      notifications.map(e =>
        <Notification
          stock={e.stock}
          name={e.name}
          key={e.id}/>
    )
    return (
      <div>
        <button onClick={this.openModal.bind(this)}>Notifications</button>
        <Modal 
          isOpen={this.state.modalIsOpen}
          style={customStyles} >

          <h3>Notifications</h3>
          <div>{list}</div>
          <button onClick={this.closeModal.bind(this)}>close</button>
        </Modal>
      </div>
    )
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array  
}

export default Notifications
