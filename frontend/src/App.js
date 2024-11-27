import React from 'react';

const App = ({ helloData, s3ListData, error }) => {
  return (
    <div>
      <h1>API Responses</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <div>
          <h2>Hello API Response:</h2>
          {helloData ? (
            <pre>{JSON.stringify(helloData, null, 2)}</pre>
          ) : (
            <p>Loading Hello API data...</p>
          )}

          <h2>List S3 API Response:</h2>
          {s3ListData ? (
            <pre>{JSON.stringify(s3ListData, null, 2)}</pre>
          ) : (
            <p>Loading List S3 API data...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
