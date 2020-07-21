import React, { Component } from "react";
import "./App.css";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import { requestApi, PER_PAGE } from "./helpers/request";
import Loader from "react-loader-spinner";
import Modal from "./Components/Modal/Modal";
import Button from "./Components/Button/Button";

export default class App extends Component {
  state = {
    request: "",
    images: [],
    numberPage: 1,
    loading: true,
    quantity: 0,
    openModalImg: "",
    loadMore: false,
    messageNotFound: false,
  };

  onSubmit = (userRequest) => {
    this.setState({
      request: userRequest,
      numberPage: 1,
      loading: true,
    });
  };

  nextPage = () => {
    this.setState((prev) => ({
      numberPage: prev.numberPage + 1,
      loading: true,
      loadMore: false,
    }));
  };

  openModal = (largeImg) => {
    this.setState({
      openModalImg: largeImg,
    });
  };

  closeModal = ({ target }) => {
    if (target.nodeName !== "IMG") {
      this.setState({
        openModalImg: "",
      });
    }
  };

  handlePressEsc = (e) => {
    if (e.key === "Escape") {
      this.closeModal(e);
    }
  };

  testServerResponse = () => {
    const { numberPage, quantity } = this.state;
    Math.ceil(quantity / PER_PAGE) === numberPage
      ? this.setState({
          loadMore: false,
        })
      : this.setState({
          loadMore: true,
        });
  };

  componentDidMount() {
    const body = document.querySelector("body");
    body.addEventListener("keyup", this.handlePressEsc);

    requestApi("", 1)
      .then((res) => {
        const requestArr = res.data;
        const newRequestArr = requestArr.hits.map((item) => ({
          id: item.id,
          smallImg: item.webformatURL,
          largeImg: item.largeImageURL,
        }));

        this.setState({
          images: newRequestArr,
          quantity: requestArr.total,
          loading: false,
          messageNotFound: requestArr.hits.length === 0,
        });
        this.testServerResponse();
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading) {
      const { request, numberPage } = this.state;

      requestApi(request, numberPage)
        .then((res) => {
          const requestArr = res.data;
          const newRequestArr = requestArr.hits.map((item) => ({
            id: item.id,
            smallImg: item.webformatURL,
            largeImg: item.largeImageURL,
          }));

          this.setState((prev) => ({
            images:
              numberPage === 1
                ? newRequestArr
                : [...prev.images, ...newRequestArr],
            loading: false,
            quantity: requestArr.total,
            messageNotFound: requestArr.hits.length === 0,
          }));
          this.testServerResponse();
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    const {
      images,
      loading,
      openModalImg,
      quantity,
      loadMore,
      messageNotFound,
    } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        <ImageGallery
          images={images}
          nextPage={this.nextPage}
          openModal={this.openModal}
        />
        {loading && (
          <Loader type="Oval" color="#3f51b5" height={100} width={100} />
        )}
        {loadMore && quantity !== 0 && <Button nextPage={this.nextPage} />}

        {messageNotFound === true && (
          <h2>No results were found for your search</h2>
        )}

        {openModalImg && (
          <Modal openModalImg={openModalImg} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
