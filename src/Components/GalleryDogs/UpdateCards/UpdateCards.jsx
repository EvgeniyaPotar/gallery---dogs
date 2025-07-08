import CardDog from "./CardDog/CardDog.jsx";
import { useEffect, useState } from "react";

const UpdateCards = () => {
  const [breeds, setBreeds] = useState([]);
  const [selected, setSelected] = useState("");
  const [numberCards, setNumberCards] = useState(3);
  const [updateNumberCards, setUpdateNumberCards] = useState(numberCards);
  const [countUpdate, setCountUpdate] = useState(0);

  const getBreeds = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/list/all`, {
        method: "GET",
      });
      const data = await response.json();
      const arrBreeds = Object.keys(data.message);
      setBreeds(arrBreeds);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getBreeds();
  }, []);

  const selectBreed = (e) => {
    setSelected(e.target.value);
    setCountUpdate((countUpdate) => countUpdate + 1);
  };

  const changeNumberCard = (e) => {
    const newValue = e.target.value;
    if (newValue >= 1 && newValue <= 50) {
      setNumberCards(newValue);
    } else {
      setNumberCards("");
    }
  };

  const updateCards = () => {
    setUpdateNumberCards(numberCards);
    if (numberCards !== updateNumberCards) {
      setCountUpdate((countUpdate) => countUpdate + 1);
    }
  };

  return (
    <>
      <div className="updateCards">
        <p>Картинки обновлены {countUpdate} раз(а)</p>
        <div className="breeds">
          <label>Порода</label>
          <select id="breed-select" value={selected} onChange={selectBreed}>
            <option value="" disabled hidden>
              Выберите породу
            </option>
            {breeds.map((breed, index) => (
              <option key={index} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>
        <div className="countCards">
          <label>Показать</label>
          <input
            value={numberCards}
            type="number"
            onChange={changeNumberCard}
            min="1"
            max="50"
            step="1"
          />
          <button onClick={updateCards}>Обновить</button>
        </div>
      </div>
      <>
        <CardDog numberCards={updateNumberCards} selectedBreed={selected} />
      </>
    </>
  );
};

export default UpdateCards;
