import React, { useEffect, useState } from 'react';

export function ListOfIngredients({ inputValues }) {
  const [filteredItems, setFilteredItems] = React.useState([]);
  const [activeIngredients, setActiveIngredients] = React.useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const allIngredients = inputValues.reduce((acc, value) => {
      const { fruits, beverages, alcohol } = value.ingredients || {};
      if (fruits) acc.fruits.push(...fruits);
      if (beverages) acc.beverages.push(...beverages);
      if (alcohol) acc.alcohol.push(...alcohol);
      return acc;
    }, { fruits: [], beverages: [], alcohol: [] });

    const uniqueBeverages = [...new Set(allIngredients.beverages)];
    const uniqueAlcohols = [...new Set(allIngredients.alcohol)];
    const uniqueFruits = [...new Set(allIngredients.fruits)];

    setFilteredItems({ fruits: uniqueFruits, beverages: uniqueBeverages, alcohol: uniqueAlcohols });
  }, []);

  const isIngredientActive = (ingredient) => {
    return activeIngredients.includes(ingredient);
  };

  const handleItemClick = (ingredient) => {
    const updatedActiveIngredients = [...activeIngredients];
    const ingredientIndex = updatedActiveIngredients.indexOf(ingredient);

    if (ingredientIndex === -1) {
      updatedActiveIngredients.push(ingredient);
    } else {
      updatedActiveIngredients.splice(ingredientIndex, 1);
    }

    setActiveIngredients(updatedActiveIngredients);
  };

  const displayAllMatchingDrinks = (activeIngredients, filterdItem) => {
    if (!filterdItem || !Array.isArray(filterdItem)) {
      console.error(`${filterdItem} is undefined or not an array`);
      return [];
    }

    const commonElements = [];

    for (let i = 0; i < filterdItem.length; i++) {
      for (let j = 0; j < activeIngredients.length; j++) {
        if (filterdItem[i] === activeIngredients[j]) {
          commonElements.push(filterdItem[i]);
          break;
        }
      }
    }

    const matchingDrinks = inputValues.filter((drink) =>
      commonElements.every((ingredient) =>
        drink.ingredients.alcohol.includes(ingredient) ||
        drink.ingredients.beverages.includes(ingredient) ||
        drink.ingredients.fruits.includes(ingredient)
      )
    );

    return matchingDrinks;
  };

  const filteredAlcohol = Array.isArray(filteredItems.alcohol) ? filteredItems.alcohol : [];
  const filteredBeverages = Array.isArray(filteredItems.beverages) ? filteredItems.beverages : [];
  const filteredFruits = Array.isArray(filteredItems.fruits) ? filteredItems.fruits : [];
  
  const matchingDrinks = displayAllMatchingDrinks(activeIngredients, [
    ...filteredAlcohol,
    ...filteredBeverages,
    ...filteredFruits,
  ]);

  console.log('Matching Drinks:', matchingDrinks);

  const handleItemClickExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <>
      <p>Pick your ingredients:</p>
      <div className='listOfIngredientBoxContainer'>
        <ul className='listOfIngredientBox'>
          Alkohole:
          {filteredItems.alcohol?.map((ingredient, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(ingredient)}
              className={`listIngredientBoxElement ${isIngredientActive(ingredient)
                ? 'listIngredientBoxElementActive'
                : ''}`}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div className='listOfIngredientBoxContainer'>
        <ul className='listOfIngredientBox'>
          Napoje:
          {filteredItems.beverages?.map((ingredient, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(ingredient)}
              className={`listIngredientBoxElement ${isIngredientActive(ingredient)
                ? 'listIngredientBoxElementActive'
                : ''}`}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div className='listOfIngredientBoxContainer'>
        <ul className='listOfIngredientBox'>
          Owoce:
          {filteredItems.fruits?.map((ingredient, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(ingredient)}
              className={`listIngredientBoxElement ${isIngredientActive(ingredient)
                ? 'listIngredientBoxElementActive'
                : ''}`}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div className='DisplayListOfDrinksContainer'>
        <ul>
          {matchingDrinks.map((value, index) => (
            <li
              key={index}
              className={`.grid-container displayListOfDrinksElement ${expandedIndex === index ? 'expanded' : ''}`}
              onClick={() => handleItemClickExpand(index)}
            >
              <div className='drinkValueContainer'>
                <div>
                  <img src={value.img} alt={`${value.drink} Image`} />
                  <h2>{value.drink}</h2>
                </div>
                {expandedIndex !== index && (
                  <div className='grid-2-box'>{value.description}</div>
                )}
                {expandedIndex === index && (
                  <>
                    <ul>
                      <div className='headTitle'>Ingredients:</div>
                      {value.ingredients.fruits.length > 0 && (
                        <li>Fruits: {value.ingredients.fruits.join(', ')}</li>
                      )}
                      {value.ingredients.alcohol.length > 0 && (
                        <li>Alcohol: {value.ingredients.alcohol.join(', ')}</li>
                      )}
                      {value.ingredients.beverages.length > 0 && (
                        <li>Juice: {value.ingredients.beverages.join(', ')}</li>
                      )}
                    </ul>
                    {value.steps.length > 0 && (
                      <div>
                        <ul>
                          <div className='headTitle'>Steps:</div>
                          {value.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>
                              {stepIndex + 1}: {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
