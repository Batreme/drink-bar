import React from 'react';
import { useEffect } from 'react';

export function ListOfIngredients({ inputValues }) {
    const [filteredItems, setFilteredItems] = React.useState([]);
    const [activeIngredients, setActiveIngredients] = React.useState([]);

    // console.log('inputValues:', inputValues);
    // console.log('filtered Items:', filteredItems);

    useEffect(()=> {
        const allIngredients = inputValues.reduce((acc, value) => {
            const { fruits, beverages, alcohol } = value.ingredients || {};
            if (fruits) acc.fruits.push(...fruits);
            if (beverages) acc.beverages.push(...beverages);
            if (alcohol) acc.alcohol.push(...alcohol);
            return acc;
        }, {fruits:[], beverages: [], alcohol: []});

        const uniqueBeverages = [...new Set(allIngredients.beverages)];
        const uniqueAlcohols = [...new Set(allIngredients.alcohol)];
        const uniqueFruits = [...new Set(allIngredients.fruits)];

        // allIngredients = uniqueIngredients.filter(
        //     (ingredient) => ingredient.toLowerCase())

        setFilteredItems({fruits:uniqueFruits, beverages: uniqueBeverages, alcohol: uniqueAlcohols});
    },[])


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

    console.log(activeIngredients);

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
        </>
    );
}
