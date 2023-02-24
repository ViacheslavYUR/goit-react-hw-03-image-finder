import React from 'react';
import { Component } from 'react';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import fetchImages from 'shared/service/image-api';
import Modal from 'shared/Modal/Modal';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './styles.css';
// import axios from 'axios';

// const API_KEY = '32167843-8e8cdf0804a85ffadb96a7b65';

class App extends Component {
  state = {
    search: '',
    gallery: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImage();
    }
  }
  async fetchImage() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await fetchImages(search, page);
      this.setState(({ gallery }) => ({
        gallery: [...gallery, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }
  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  searchImage = ({ search }) => {
    this.setState({ search });
  };

  showImage = ({ largeImageURL, tag }) => {
    console.log(largeImageURL);
    this.setState({
      showModal: true,
      largeImage: {
        largeImageURL,
        tag,
      },
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImage: null });
  };

  render() {
    const { gallery, search, error, loading, showModal, largeImage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchImage} />
        <main>
          <ImageGallery items={gallery} showImage={this.showImage} />
          {search && !gallery.length && <p> Not found, try search any one else ...</p>}
          {error && <p>{error}</p>}
          {loading && <p>loading ...</p>}
          {gallery.length !== 0 && (
            <button type="submit" className={css.button} onClick={this.loadMore}>
              <span className={css.buttonLabel}>Load more</span>
            </button>
          )}
        </main>
        {showModal && (
          <Modal close={this.closeModal}>
            <ImageGalleryItem {...largeImage} />
          </Modal>
        )}
      </>
    );
  }
}

export default App;

/* <Searchbar>, <ImageGallery>, <ImageGalleryItem>, <Loader>, <Button> і <Modal></Modal> */
