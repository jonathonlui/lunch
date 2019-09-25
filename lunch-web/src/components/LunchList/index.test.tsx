import React from 'react';
import { render } from '@testing-library/react';
import LunchList from './index';

describe('<LunchList>', () => {
  describe('isVisible=false', () =>{
    it('renders without crashing', () => {
      render(<LunchList isVisible={false} />);
    });
  });
  describe('isLoading', () =>{
    it('renders without crashing', () => {
      render(<LunchList isLoading />);
    });
  });
  describe('lunches=[]', () =>{
    it('renders without crashing', () => {
      render(<LunchList lunches={[]} />);
    });
  });
  describe('lunches=[lunch1, lunch2]', () => {
    it('renders without crashing', () => {
      render(<LunchList
        lunches={[{
          id: 'mock-id-1',
          name: 'Mock Lunch 1',
          meals: [],
        }, {
          id: 'mock-id-2',
          name: 'Mock Lunch 2',
          meals: [],
        }]}
    />)
    });
  });
});

