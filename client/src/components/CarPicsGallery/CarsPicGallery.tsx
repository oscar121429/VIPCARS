import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../context/AuthContext/useAuth"
import type { Car } from "../../types/auth.types"
import { fetchData } from "../../helpers/axiosHelper/axiosHelper"
import { type AddPicturesResponse, type Gallery, type GetCarImagesResponse } from "../../types/images.type"
import "./CarsPicGallery.css"

interface CarPicsGalleryProps {
  car_id: Car["car_id"]
}

export const CarsPicGallery = ({ car_id }: CarPicsGalleryProps) => {
  const [images, setImages] = useState<Gallery[]>([]);
  const [showForm, setShowform] = useState(false);
  const [newPic, setNewPic] = useState<FileList | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPics = async () => {
      try {
        const res = await fetchData<GetCarImagesResponse>({
          url: `car/getImages/${car_id}`,
          method: 'GET',
          token
        })

        setImages(res.result)

      } catch (error) {
        console.log(error);

      }
    }
    fetchPics();
  }, [car_id, token])


  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAddClick = () => {
    fileInputRef.current?.click();
    setShowform(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPic(e.target.files);
  };

  const addPicture = async () => {
    try {
      if (newPic) {
        const newformData = new FormData();
        for (const elem of newPic) {
          newformData.append("img", elem)
        }
        const res = await fetchData<AddPicturesResponse, FormData>({
          url: `car/addPictures/${car_id}`,
          method: 'POST',
          data: newformData,
          token
        })
        setImages(res.updatePics);
        setShowform(false);
      }
    } catch (error) {
      console.log(error);

    }
  }

  const cancelar = () => {
    setShowform(false)

  }

  const deleteImg = async(
    image_id: Gallery["image_id"],
     filename: Gallery["file"]
    )=>{
    const data = {image_id, car_id, filename};
    try {
       await fetchData({
        url:'car/delImage',
        method:'POST',
        data: data,
        token
      });
      setImages(images.filter(elem=>elem.image_id !== image_id))
      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="gallery-container">

      {images.map((img) => (
        <div key={img.image_id} className="img-wrapper">

          <div className="div-img">
            <img
              className="car-image"
              src={`${import.meta.env.VITE_SERVER_IMAGES}/cars/${img.file}`}
              alt=""
            />
          </div>

          
          <i className="bi bi-trash delete-icon delete-img-icon"
          onClick={()=>deleteImg(img.image_id, img.file)}
          >
        
          </i>


        </div>
      ))}


      <div className="add-img-card" onClick={handleAddClick} >
        <i className="bi bi-plus-lg add-icon"></i>
        <input
          type="file"
          multiple
          hidden
          ref={fileInputRef}
          onChange={handleChange}
        />
      </div>

      <div className="py-3">

        {showForm && (
          <div>

            <button className="button_register acept m-2" onClick={addPicture}>Aceptar</button>
            <button className="button_register cancel" onClick={cancelar}>Cancelar</button>
          </div>
        )}

      </div>

    </div>
  )
}
