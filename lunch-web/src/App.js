import React, { Component } from 'react';
import './App.css';
import { db } from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      lunches: [],
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { docs } = await db.collection('lunches').get();
    this.setState({ isLoading: false, lunches: docs })
  }

  render() {
    const { isLoading, lunches } = this.state;
    return (
      <div className="App">
        <ul>
          {lunches.map(({ id, name }) => <li key={id}>{name || id}</li>)}
          {isLoading ? <li>Loading...</li> : null}
        </ul>
      </div>
    );
  }
}

export default App;
