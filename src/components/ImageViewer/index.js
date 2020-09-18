import React, { useRef, useEffect } from 'react';
import * as loadimage from 'blueimp-load-image';

export default function ImageViewer({ source }) {

    const imageCanvas = useRef(null);

    useEffect(() => {
        loadimage(source, (img) => {
            console.log(img)
            if( img.type === 'error' ) {
                
            } else {
                img.className = 'fit_to_parent';
                imageCanvas.current.appendChild(img);
            }
        }, {  orientation: true });
    }, []);

    return(
        <div
            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            ref={ imageCanvas }
        />
    );
}