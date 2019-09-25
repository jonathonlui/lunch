import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { getLunches } from './database';

jest.mock('./database');

describe('<App>', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});
