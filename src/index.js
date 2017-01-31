import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';

class RenderApp extends React.Component {
  render () {
    return (
      <div className="body">
        <App />
      </div>
    )
  }
}

ReactDOM.render(
  <RenderApp />,
  document.getElementById('root')
);
