import React, { useContext } from 'react';
import  { NotificationContext }  from './NotificationProvider';

function useNotification() {
  const { message, addMessage, removeMessage, pipeline,addToPipeline, startPipeline, removePipeline, removeFromPipeline, started  } = useContext(NotificationContext);
  return { message, addMessage, removeMessage, pipeline,addToPipeline, startPipeline, removePipeline, removeFromPipeline, started };
}

export default useNotification;