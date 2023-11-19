import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import toast, { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { AppWrapper } from './App.styled';
import { fetchImages } from '../api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getImages() {
      const slashIndex = query.indexOf('/') + 1;
      const trimedQuery = query.slice(slashIndex, query.length);

      try {
        setIsLoading(true);
        const fetchedImages = await fetchImages(trimedQuery, page);
        setImages(prevState => [...prevState, ...fetchedImages.data.hits]);
      } catch (error) {
        toast.error('Try again!');
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [page, query]);

  const getSearchInfo = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const newQuery = form.elements.search.value;
    form.reset();
    setQuery(`${Date.now()}/${newQuery.trim()}`);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={getSearchInfo} />
      {isloading && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGallery findedImages={images} />
          <Button onSerchClick={handleLoadMore} />
        </>
      )}
      <GlobalStyle />
      <Toaster />
    </AppWrapper>
  );
};
