import React, { useState } from 'react';

export function DisplayListOfDrinks({ inputValues }) {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleItemClick = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <div className='DisplayListOfDrinksContainer'>
            <ul>
                {inputValues.map((value, index) => (
                    <li
                        key={index}
                        className={`.grid-container displayListOfDrinksElement ${expandedIndex === index ? 'expanded' : ''}`}
                        onClick={() => handleItemClick(index)}
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
    );
}
