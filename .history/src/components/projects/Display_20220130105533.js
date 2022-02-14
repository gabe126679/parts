import React, { useState } from 'react';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import Modal from './Modal';

function Display() {
  const [selectedImg, setSelectedImg] = useState(null);
    
  return (
    <div>
     <h6>images</h6>
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      { selectedImg }
    </div>
  );
}

export default Display;