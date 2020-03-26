import React, { useState } from 'react';
import _ from "lodash";
import { Document, Page } from "react-pdf/dist/entry.webpack";

export default function PdfComponent({ file, wrapperDivSize }) {

    const [page, setPage] = useState(1);
    const [numberPages, setNumberPages] = useState(null);
  
    const onDocumentLoad = (pdf) => {
        setNumberPages(pdf.numPages);
    }

    const renderLoader = () => {
        
    }

    const renderNoData = () => {

    }

    const renderError = (error) => {

    }

    return(        
        <div>
            <Document file={file} 
                      onLoadSuccess={onDocumentLoad}
                      error="Não foi possivel carregar este documento"
                      loading={renderLoader}
                      noData={renderNoData}
                      onLoadError={renderError}
                      >
                <Page pageIndex={0} loading={""} noData={""} width={wrapperDivSize} />
                {
                    numberPages ? _.range(2, numberPages).map((e, key) => (<Page key={key} width={wrapperDivSize} pageNumber={e} loading={""} noData={""} />)) : ''
                }        
            </Document>
        </div>  
    );
}