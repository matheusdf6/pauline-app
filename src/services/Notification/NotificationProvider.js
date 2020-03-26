import React, { useState, useCallback } from 'react';

export const NotificationContext = React.createContext({
  message: null,
  addMessage: () => {},
  removeMessage: () => {},
  pipeline: [],
  addToPipeline: () => {},
  started: false,
  startPipeline: () => {},
  removeFromPipeline: () => {},
  removePipeline: () => {}
});

export default function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [pipeline, setPipeline] = useState([]);
  const [pipeStart, setPipeStart] = useState(false);

  const removeMessage = () => setMessage(null);

  const addMessage = (icon, title, subtitle, text, buttonText, buttonFn, closeText, closeFn) => setMessage({ icon, title, subtitle, text, buttonText, buttonFn, closeText, closeFn });

  const addToPipeline = (icon, title, subtitle, text, buttonText, buttonFn, closeText, closeFn) => setPipeline(p => p.concat({ icon, title, subtitle, text, buttonText, buttonFn, closeText, closeFn }));

  const startPipeline = () => setPipeStart(true);

  const removeFromPipeline = () => setPipeline(p => p.slice(1)); 

  const removePipeline = () => { setPipeline([]); setPipeStart(false) } ;

  const contextValue = {
    message,
    addMessage: useCallback((icon, title, subtitle, text, buttonText, buttonFn, closeText, closeFn) => addMessage(icon, title, subtitle, text, buttonText, buttonFn, closeText, closeFn), []),
    removeMessage: useCallback(() => removeMessage(), []),
    pipeline,
    started: pipeStart,
    addToPipeline: useCallback((icon, title, subtitle, text, buttonText, buttonFn, closeText, closeFn) => addToPipeline(icon, title, subtitle, text, buttonText, buttonFn, closeText, closeFn), []),
    startPipeline: useCallback(() => startPipeline(), []),
    removePipeline: useCallback(() => removePipeline(), []),
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}