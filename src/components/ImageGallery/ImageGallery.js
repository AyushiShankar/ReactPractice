import React, { useState } from "react";
import "./styles.css";

const ImageGallery = () => {
  const [url, setUrl] = useState("");
  const [modal, setModal] = useState({
    toShow: false,
    image: ""
  });
  const [images, setImages] = useState([]);

  const handleAddImage = () => {
    if (!isValidImage(url)) return;
    const id = Date.now();
    setImages((prev) => [
      ...prev,
      {
        url: url,
        id: id,
      },
    ]);
    setUrl("");
  };
  const isValidImage = (url) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };
  const handleDeleteImages = (id) => {
    setImages((prev) => prev.filter(image => image.id !== id));
  };

  return (
    <div>
      <h1>Image Gallery Application</h1>
      <div>
        <input
          type="text"
          placeholder="Enter image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleAddImage}>Add Image</button>
      </div>
      <div>
        {images.map((image, index) => (
          <div
            key={image.id}
            style={{
              position: "relative",
              width: "250px",
              marginTop: "40px",
            }}
          >
            <img
              src={image.url}
              alt={`Gallery image ${index}`}
              style={{
                width: "250px",
                height: "400px",
                objectFit: "cover",
                display: "block",
              }}
              onClick={() =>
                setModal({
                  toShow: true,
                  image: image.url,
                })
              }
            />

            <button
              onClick={() => handleDeleteImages(image.id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                zIndex: 1,
              }}
            >
              Delete
            </button>
          </div>
        ))}
        {modal?.toShow && (<div
          id="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
          onMouseDown={() => setModal((prev) => ({
            toShow: false,
            image: "",
          }))}>
          <img src={modal.image} alt=""
            style={{
              height: "80%",
              margin: "50px 50px",
            }}
            onMouseDown={(e) => e.stopPropagation()} />
        </div>)}
      </div>
    </div>
  );
};

export default ImageGallery;
