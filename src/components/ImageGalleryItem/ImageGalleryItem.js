import { useState } from 'react';
import { ModalWindow } from '../Modal/Modal';
import { ListItem, ListItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  imageItem: { webformatURL, largeImageURL, tags },
}) => {
  const [isModalOpen, setisModalOpen] = useState(false);

  const openModal = () => setisModalOpen(true);
  const closenModal = () => setisModalOpen(false);

  return (
    <>
      <ListItem onClick={openModal}>
        <ListItemImg src={webformatURL} alt={tags} />
      </ListItem>
      <ModalWindow
        onClose={closenModal}
        imageUrl={largeImageURL}
        imageAlt={tags}
        isOpen={isModalOpen}
      />
    </>
  );
};
