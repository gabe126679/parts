import React, { useEffect } from 'react';
import useFirestore from '../../hooks/useFirestore';
import { projectFirestore } from '../../config/fbConfig';
import { motion } from 'framer-motion';

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore('images');

    // useEffect( () => {
    //     return async () => {

    //       const images = projectFirestore.collection("images");
    //       const image = await images.get()
    //       image.forEach(doc => {
    //         doc.ref.delete();
    //       })
    //     }
    // }, [])

  return (
    <div className="img-grid">
      {docs && docs.map(doc => (
        <div className="image-container container">
          <motion.div className="img-wrap" key={doc.id} 
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => {
              setSelectedImg(doc.url)
              console.log(doc)
            }}
          >
            <motion.img src={doc.url} alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
            
          </motion.div>
          <button className="btn btn-two" type="button" onClick={async () => {
            const document = projectFirestore.collection("images").doc(doc.id)
            const image= await document.get()
            image.ref.delete()
          }}>Delete</button>
          <br/>
        </div>
      ))}
    </div>
  )
}

export default ImageGrid;