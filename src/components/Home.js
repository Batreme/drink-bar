import React from 'react';
import { DisplayListOfDrinks } from './DisplayListOfDrinks';
import { SearchBarElement } from './SearchBarElement';
import initialCocktailArr from './data';
import { ListOfIngredients } from './ListOfIngredients';

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
        <div className='SearchBoxElementBox'>
          <div className='mainListBox'>
        <ListOfIngredients inputValues={inputValues} onItemClick={handleItemClick} />
          </div>
        <DisplayListOfDrinks inputValues={inputValues} onItemClick={handleItemClick}/>
        </div>
    </div>
  );
}

export default Home;
