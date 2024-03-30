import React from "react";
import { FiChevronLeft } from 'react-icons/fi'
import { FiChevronRight } from 'react-icons/fi'
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const PHOTOS_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY

/* PHOTO CAROUSEL */

export default function PhotosWidget(props) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const [photos, setPhotos] = React.useState([])
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);
    
  React.useEffect(() => {
    fetch(`https://api.unsplash.com/search/photos/?query=${props.searchParam}&client_id=${PHOTOS_API_KEY}&orientation=portrait&per_page=50`)
      .then(res => res.json())
      .then(data => setPhotos(data.results))
      .catch((error) => {
        console.log(error)
      });
  }, [props.searchParam])


  // Image change timing

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === photos.length - 1 ? 0 : prevIndex + 1
        ),
      4000
    );

    return () => {
      resetTimeout();
    };
  }, [index, photos.length]);


  function moveToNextImage() {
    setIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    )
  }

  function moveToPreviousImage() {
    setIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : 0
    ) 
  }

  // Wrap images in link tags and connect to source url

  const slideShow = photos.map((photo, index) => {
    return (  
      <div className="slide" key={photo.id} to="route" target="_blank" rel="noopener noreferrer" alt={photo.alt_description}>
        <a href={photo.urls.regular} key={photo.id} className="img-link" to="route" target="_blank" rel="noopener noreferrer">
          <img  src={photo.urls.regular} alt={photo.alt_description} id={`img-${index}`}  className="grid-img" />
        </a>  
      </div>
    )
  })

  const styles = {
    transform: `translate3d(${-index * 100}%, 0, 0)`
  }

  return (
      <div className="photo-container slideshow light-mode widget-radius">
        <div className="slideshowSlider" style={styles}>
          {slideShow}
        </div>
        <div className="slideshow-arrows-container">
          <div className="slide-arrow left" onClick={() => moveToPreviousImage()}><FiChevronLeft /></div>
          <div className="slideshow-counter">{`${index + 1}/${photos.length}`}</div>
          <div className="slide-arrow right" onClick={() => moveToNextImage()}><FiChevronRight /></div>
        </div>                     
      </div>
  )
}