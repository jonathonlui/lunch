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
    db.collection('lunches').onSnapshot(({ docs }) => {
      const lunches = docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.setState({ isLoading: false, lunches });
    });
  }

  render() {
    const { isLoading, lunches } = this.state;
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;
