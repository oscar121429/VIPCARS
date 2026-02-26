import { useState } from "react";
import type { ImageCarouselProps } from "../../types/OneUser.types"
import "./CarCarousel.css"


export const CarCarousel = ({ images }: ImageCarouselProps) => {

  const validImages = images.filter(Boolean);
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < validImages.length - 3) {
      setIndex(index + 1);
    }
  }

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }
  return (
    <div className="carouselWrapper">

      <button className="arrow left" onClick={prev}>◀</button>

      <div className="viewport">

        <div
          className="slider"
          style={{
            transform: `translateX(-${index * 33.33}%)`
          }}
        >
          {validImages.map((img, i) => (
            <img
              key={i}
              src={`${import.meta.env.VITE_SERVER_IMAGES}/${img.startsWith('cars/') ? img : `cars/${img}`}`}
              className="slide"
              alt="car"
            />
          ))}
        </div>

      </div>

      <button className="arrow right" onClick={next}>▶</button>

    </div>
  )
}
