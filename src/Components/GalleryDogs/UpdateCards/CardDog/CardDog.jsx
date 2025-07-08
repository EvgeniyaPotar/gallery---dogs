import { useEffect, useState } from "react";

const CardDog = ({ numberCards, selectedBreed }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRandomImage = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dog.ceo/api/breeds/image/random/${numberCards}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setImages(data.message);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getBreedImage = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${selectedBreed}/images/random/${numberCards}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setImages(data.message);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    selectedBreed === "" ? getRandomImage() : getBreedImage();
  }, [numberCards, selectedBreed]);

  return (
    <>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="cards">
          {images.map((url, index) => (
            <div className="card-item">
              <img src={url} alt={`image${index}`} width="300" height="300" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CardDog;
