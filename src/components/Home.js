import React from 'react';
import { DisplayListOfDrinks } from './DisplayListOfDrinks';
import { SearchBarElement } from './SearchBarElement';
import initialCocktailArr from './data';

function Home() {
    const { data: initialCocktailData } = initialCocktailArr;

  const [inputValues, setInputValues] = React.useState(initialCocktailData);
  const [newElement, setNewElement] = React.useState('');
  const [idCounter, setIdCounter] = React.useState(1000);
  const [isAddingElement, setIsAddingElement] = React.useState(false);

  const handleAddElement = () => {
    const newIngredient = {
      id: Number(idCounter),
      ingredients: newElement
    };

    setInputValues([...inputValues, newIngredient]);
    setNewElement('');
    setIdCounter(idCounter + 1);
    setIsAddingElement(false);
  };

  const handleItemClick = (index) => {
    const updatedValues = [...inputValues];
    updatedValues[index].active = !updatedValues[index].active;
    setInputValues(updatedValues);
  };


  return (
    <div className='SearchBoxElement'>
      <header className="SearchBoxElementBox">

        <SearchBarElement inputValues={inputValues} onItemClick={handleItemClick} />
        <DisplayListOfDrinks inputValues={inputValues} onItemClick={handleItemClick}/>
      </header>
    </div>
  );
}

export default Home;
