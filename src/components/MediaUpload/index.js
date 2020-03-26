import React from 'react';

// import { Container } from './styles';

export default function MediaUpload({ onDone  }) {

    const handleChange = (e) => {
        let files = e.target.files;
        var allFiles = [];
        for (var i = 0; i < files.length; i++) {
        let file = files[i];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
                let fileInfo = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + ' kB',
                    base64: reader.result,
                    file: file,
                };
                allFiles.push(fileInfo);
                if(allFiles.length == files.length) {
                    onDone(allFiles[0]);
                }
            }
        } 
    }

  return (
    <input
        type="file"
        onChange={ handleChange } />  
    );
}
