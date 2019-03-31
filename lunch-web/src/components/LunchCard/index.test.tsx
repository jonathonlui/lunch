import React from 'react';
import { render } from 'react-testing-library';
import LunchCard from './index';

describe('<LunchCard>', () => {
  describe('with minimum Lunch object', () =>{
    it('renders without crashing', () => {
      render(<LunchCard
        lunch={{
          id: 'mock-id',
          name: 'Mock Lunch',
          meals: [],
        }}
      />);
    });
  });
  describe('with full Lunch object', () =>{
    it('renders without crashing', () => {
      render(<LunchCard
        lunch={{
          id: 'mock-id',
          name: 'Mock Lunch',
          description: 'Mock description',
          meals: [{
            name: 'Mock Meal 1',
            price: 4.67,
          }, {
            name: 'Mock Meal 2',
            price: 3.50,
          }, {
            name: 'Mock Meal 3',
            price: 6.43,
          }],
          address: 'mock-address',
          yelpLink: 'mock-yelp-link',
          imageUrl: 'mock-image-url',
        }}
      />);
    });
  });
});
