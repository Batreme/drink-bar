import React from 'react';

export function SearchBarElement({ inputValues, onItemClick }) {
    const [searchItem, setSearchItem] = React.useState('');
    const [filteredItems, setFilteredItems] = React.useState([]);
    const [activeIngredients, setActiveIngredients] = React.useState([]);

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const allIngredients = inputValues.reduce((acc, value) => {
            const { fruits, Juice, Alcohol } = value.ingredients;
            acc.push(...fruits, ...Juice, ...Alcohol);
            return acc;
        }, []);

        const uniqueIngredients = [...new Set(allIngredients)];
        const filteredItems = uniqueIngredients.filter((ingredient) => ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredItems(filteredItems);
    };

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

    return (
        <>
            <p>Pick your ingredients:</p>
            <div className='listIngredientBoxContainer'>
                <ul className='listIngredientBox'>
                    {filteredItems.map((ingredient, index) => (
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
            <input
                className='searchIngredientInput'
                type="text"
                value={searchItem}
                onChange={handleInputChange}
                placeholder='Type to search' />
        </>
    );
}
