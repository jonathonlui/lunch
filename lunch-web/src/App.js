import React, { Component } from 'react';
import './App.css';
import { db } from './firebase';

import LunchList from './components/LunchList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      lunches: [],
    };
  }

  componentDidMount() {
    this.reloadLunches();
  }

  reloadLunches = async () => {
    this.setState({ isLoading: true });
    const { docs } = await db
      .collection('lunches')
      .where('meals', '>', []) // Only get lunches that have meals
      .get();
    const lunches = docs.map(doc => ({ id: doc.id, ...doc.data() }));
    this.setState({ isLoading: false, lunches });
  };

  render() {
    const { isLoading, lunches } = this.state;
    return (
      <div className="App">
        <LunchList lunches={lunches} isLoading={isLoading} />
        <button
          type="button"
          disabled={isLoading}
          onClick={this.reloadLunches}
        >
          Refresh
        </button>
      </div>
    );
  }
}

export default App;
