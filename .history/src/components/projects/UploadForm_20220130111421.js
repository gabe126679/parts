import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {

    if (e.target.files[0] && e.target.files[0].type === 'image/png' || 'image/jpeg') {
      setFile(e.target.files[0]);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
    // console.log(e.target.files[0]);
    console.log(file);
  };



  return (
    <form>
      <label>
        <input type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { file && <div>{ file.name }</div> }
        { file && <ProgressBar file={file} setFile={setFile} /> }
      </div>
    </form>
  );
}

export default UploadForm;