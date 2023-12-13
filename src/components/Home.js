import React from 'react';
import { DisplayListOfDrinks } from './DisplayListOfDrinks';
import initialCocktailArr from './data';
import { ListOfIngredients } from './ListOfIngredients';

function Home() {
  const { data: initialCocktailData } = initialCocktailArr;
  const [inputValues, setInputValues] = React.useState(initialCocktailData);

  return (
    <div className='SearchBoxElement'>
        <div className='SearchBoxElementBox'>
          <div className='mainListBox'>
        <ListOfIngredients inputValues={inputValues}  />
          </div>
        {/* <DisplayListOfDrinks inputValues={inputValues} /> */}
        </div>
    </div>
  );
}

export default Home;
