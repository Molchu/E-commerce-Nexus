import React, { useEffect } from 'react';

const ZendeskWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'ze-snippet';
    script.src = "https://static.zdassets.com/ekr/snippet.js?key=e7692391-7553-452b-b223-f583d15a077a"; 
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default ZendeskWidget;