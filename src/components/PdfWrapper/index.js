import React, { useState, useEffect, useRef } from 'react';
import { throttle } from "lodash";

import PdfComponent from "../PdfComponent";

export default function PdfWrapper({ file }) {

    const pdfWrapper = useRef(null);
    const [ wrapperWidth, setWrapperWidth ] = useState(null);

    const throttledSetPDFWidth = () => throttle(setDivSize, 500);

    useEffect(() => {
        setDivSize();
        window.addEventListener('resize', throttledSetPDFWidth);

        return () => {
            window.removeEventListener('resize', throttledSetPDFWidth);

        }
    },[])


    const setDivSize = () => {
        setWrapperWidth(pdfWrapper.current.getBoundingClientRect().width);
    }

    return (
        <div id="row" style={{height: "calc(100vh - 224px)", width: "calc(100% - 30px)", margin: "0 auto",  display: "flex", overflow: "hidden"}}>
            {/* <div id="placeholderWrapper" style={{width: "10vw", height: "100vh"}}/> */}
            <div id="pdfWrapper" style={{width: "100%", overflow: 'scroll', padding: '15px', background: '#505559'}} ref={ pdfWrapper }>
                <PdfComponent wrapperDivSize={ wrapperWidth - 30 } file={file} />
            </div>
        </div>
    );
}
