# ReduxBaseApp Modal recipe

We have implemented modal functionality using [react-modal](https://github.com/rackt/react-modal) by the Rackt team. Please refer to the documentation for more detailed explanation

Here we will stay just with a brief explanation of our use case.

#Where

[Notifications Component](../example-app/src/components/notifications.js)

#How

###Installation
```
npm install --save react-modal
```

### Concepts/Elements needed
Once you import the component the most tipical props you can pass to it are
- isOpen. Wether the modal is open or not
- style. Custom styles for the modal
- onRequestClose. Callback to call when the modal is closed

As children you should pass the content of your modal
```
<Modal
  isOpen={this.state.modalIsOpen}
  style={customStyles} >

  <h3>{t('notifications.title')}</h3>
    <div>{list}</div>
    <button onClick={this.closeModal.bind(this)}>{t('notifications.closeButton')}</button>
  </Modal>
```



