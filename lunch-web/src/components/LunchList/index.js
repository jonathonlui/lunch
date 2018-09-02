import React from 'react';
import './index.css';


function toCurrency(value, defaultValue, { locale = 'en-US', currency = 'USD' } = {}) {
  if (!Number.isFinite(value)) {
    return defaultValue;
  }
  return value.toLocaleString(locale, { style: 'currency', currency });
}


const MealItem = ({ meal: { name, price } }) => (
  <li className="MealItem">
    <span className="MealItemName">{name}</span>
    <span className="MealItemPrice">{toCurrency(price)}</span>
  </li>
);


const MealList = ({ meals }) => (
  meals && meals.length
    ? (
      <ul className="LunchItemMealList">
        {meals.map(meal => <MealItem key={meal.id || meal.name} meal={meal} />)}
      </ul>
    ) : null
);


const LunchItemPriceRange = ({ meals }) => {
  if (!meals || meals.length < 1) {
    return null;
  }
  const prices = meals.map(({ price }) => price).sort((a, b) => a - b);
  const low = prices[0];
  const high = prices.slice(-1)[0];
  const rangeString = low === high
    ? toCurrency(low)
    : `${toCurrency(low)} - ${toCurrency(high)}`;

  return (
    <div className="LunchItemPriceRange">
      {rangeString}
    </div>
  );
};


const LunchItem = ({
  lunch: {
    id,
    name,
    description,
    meals,
    yelpLink,
  },
}) => (
  <li className="LunchItem">
    <div className="LunchItemName">{name || id}</div>
    <LunchItemPriceRange meals={meals} />
    {description && <div className="LunchItemDescription">{description}</div>}
    <MealList meals={meals} />
    <div className="LunchItemFooter">
      {yelpLink && <a href={yelpLink}>Yelp</a>}
    </div>
  </li>
);


const NoLunches = () => (
  <li>No lunches</li>
);


const LunchesLoading = () => (
  <li>Loading...</li>
);


const LunchList = ({ lunches, isLoading }) => (
  <ul>
    {
      lunches.length < 1 && !isLoading
        ? <NoLunches />
        : lunches.map(lunch => <LunchItem key={lunch.id} lunch={lunch} />)
    }
    {isLoading && <LunchesLoading />}
  </ul>
);


export default LunchList;
