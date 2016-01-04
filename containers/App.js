import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import DevTools from '../containers/DevTools'
import { logout } from '../actions/auth'
import Modal from 'react-modal'

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

class Header extends Component {
  onClick(e) {
    e.preventDefault()
    this.props.logout()
  }
  render() {
    const {title, username, modalIsOpen, notifications} = this.props  
    return (
      <div>
        <header>
          <h1>{title}</h1>
          {' '}
          <p>Bienvenido {username}</p>
          <Link to="/">Home</Link>
          {' '}
          <Link to="/ingredients">Ingredients</Link>
          {' '}
          <Link to="/dishes">Dishes</Link>
          {' '}
          <Link to="/orders">Orders</Link>
          {' '}
          <Notifications notifications={notifications}/>
          {' '}
          <a href onClick={this.onClick.bind(this)}>Logout</a>
        </header>
      </div>
    );  
  }
}

Header.propTypes = {
  title: PropTypes.string  
}

function App({children, username, logout, notifications}) {
  return (
    <div>
      <Header title={"DAH"} username={username} logout={logout} notifications={notifications}>
      </Header>
      <div style={{marginTop: '1.5em'}}>{children}</div>
      <DevTools/>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element,
  username: PropTypes.string,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    ...state.auth.session,
    notifications: state.notifications
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

