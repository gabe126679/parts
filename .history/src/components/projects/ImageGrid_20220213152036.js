import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import { motion } from 'framer-motion';

const ImageGrid = (props, { setSelectedImg }) => {
  const { photos } = props;
  const { docs } = useFirestore('images');

  console.log({setSelectedImg: null })

  if (photos) {
    return (
      <div className="img-grid">
        {photos && photos.map(doc => (
          
          <motion.div className="img-wrap" key={doc} 
            layout
            whileHover={{ opacity: 1 }}
            
          >
            
            <motion.img src={doc} alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))}
      </div>
    )
  } else {
    return (
      <div className="img-grid">
        {docs && docs.map(doc => (
          <motion.div className="img-wrap" key={doc.id} 
            layout
            whileHover={{ opacity: 1 }}
            onClick={{setSelectedImg: doc.id }}
          >
            <motion.img src={doc.url} alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))}
      </div>
    )    
  }
}



export default ImageGrid;