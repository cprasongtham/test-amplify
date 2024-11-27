import React from 'react';

const App = ({ data, error }) => {
  return (
    <div>
      <h1>API Response</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
