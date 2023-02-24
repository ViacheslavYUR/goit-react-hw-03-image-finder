import React from 'react';

import css from './imageItem.module.css';

const ImageGalleryItem = ({ largeImageURL, tag }) => {
  return (
    <>
      <img className={css.largeImage} src={largeImageURL} alt={tag} />
    </>
  );
};

export default ImageGalleryItem;
