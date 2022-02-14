import React, { useState } from 'react';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="App">
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      { selectedImg }
    </div>
  );
}

export default App;