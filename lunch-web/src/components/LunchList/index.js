import React from 'react';
import './index.css';


const LunchItem = ({ lunch: { id, name, price } }) => (
  <li className="LunchItem">
    <div>{name || id}</div>
    <div>{price || '-'}</div>
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
