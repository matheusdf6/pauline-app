import React, { useState, useEffect } from 'react';
import useNotification from './useNotification';

export default function NotificationPipeline() {
  const { pipeline, startPipeline, started, removeFromPipeline, removePipeline } = useNotification();
  const [ index, setIndex ] = useState(-1);
  const [ max, setMax ] = useState(0);

  const handleSubmit = (action) => {
    next();
    if( action != null ) {
        action();
    }
  };

  const handleClose = (action) => {
    next();
    if( action != null ) {
        action();
    }
  }

  const next = () => {
    if(index < max ) {
        setIndex(index + 1);
    } else {
        removePipeline();
    }
  }

  useEffect(() => {
      if(started) {
        setMax(pipeline.length - 1);
        setIndex(0);    
      }
  }, [started])

  return (
      <>
        {
            pipeline && started && index >= 0 ? 
            (
                <div className={ pipeline[index] ? "full-screen opened" : "full-screen"}>

                <div className="notification-box">
                { 
                  pipeline[index] && pipeline[index].icon  ? (<img src={pipeline[index].icon} />) : ''
                }
                {
                    pipeline[index] && pipeline[index].title ? (<h2>{pipeline[index].title}</h2>) : ''
                }
                {
                    pipeline[index] && pipeline[index].subtitle ? (<h3>{pipeline[index].subtitle}</h3>) : ''
                }
                {
                    pipeline[index] && pipeline[index].text ? (<p>{pipeline[index].text}</p>) : ''
                }
                {
                    pipeline[index] && pipeline[index].buttonText  ? (<button onClick={ () => handleSubmit(pipeline[index].buttonFn) } className="ok-button">{pipeline[index].buttonText}</button>) : ''
                }
                <button className="help-button" onClick={ () => handleClose(pipeline[index].closeFn) }>{pipeline[index] && pipeline[index].closeText ? pipeline[index].closeText : 'Lembrar-me depois'}</button>
      
                </div>
            </div>
      
            ) : ''
        }
      </>
      
  )
}