import React from 'react';
import ReactDOM from 'react-dom';
import './css-reset.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// eslint-disable-next-line no-underscore-dangle
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;


class ServiceWorkerUpdate extends React.Component {
  state = {
    serviceWorkerUpdated: false,
  };

  componentDidMount() {
    registerServiceWorker().then(({ updated } = {}) => (
      this.setState({ serviceWorkerUpdated: updated })
    ));
  }

  render() {
    const { serviceWorkerUpdated } = this.state;
    return <App serviceWorkerUpdated={serviceWorkerUpdated} />;
  }
}

ReactDOM.render(<ServiceWorkerUpdate />, document.getElementById('root'));
