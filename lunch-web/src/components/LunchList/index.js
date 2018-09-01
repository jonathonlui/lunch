import React from 'react';


const LunchList = ({ lunches, isLoading }) => (
  <ul>
    {
      lunches.length < 1
        ? !isLoading && <li>No lunches</li>
        : lunches.map(({ id, name }) => (
          <li key={id}>{name || id}</li>
        ))
    }
    {isLoading ? <li>Loading...</li> : null}
  </ul>
);


export default LunchList;
