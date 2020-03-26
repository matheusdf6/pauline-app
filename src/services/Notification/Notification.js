import React from 'react';
import useNotification from './useNotification';

export default function Notification() {
  const { message, removeMessage } = useNotification();

  const handleSubmit = () => {
    removeMessage();
    if( message.buttonFn ) {
        message.buttonFn();
    }
  };

  const handleClose = () => {
    removeMessage();
    if( message.closeFn ) {
        message.closeFn();
    }
  }

  return (
      <div className={ message ? "full-screen opened" : "full-screen"}>
          <div className="notification-box">
          { 
            message && message.icon  ? (<img src={message.icon} />) : ''
          }
          {
              message && message.title ? (<h2>{message.title}</h2>) : ''
          }
          {
              message && message.subtitle ? (<h3>{message.subtitle}</h3>) : ''
          }
          {
              message && message.text ? (<p>{message.text}</p>) : ''
          }
          {
              message && message.buttonText  ? (<button onClick={ handleSubmit } className="ok-button">{message.buttonText}</button>) : ''
          }
          <button className="help-button" onClick={ handleClose }>{message && message.closeText ? message.closeText : 'Lembrar-me depois'}</button>

          </div>
      </div>
  )
}