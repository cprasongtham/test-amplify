import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const BASE_URL = 'https://api-putest.snaplogicsandbox.com/lambda';

const AppWrapper = () => {
  const [helloData, setHelloData] = useState(null);
  const [s3ListData, setS3ListData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from both APIs
    const fetchApis = async () => {
      try {
        const helloResponse = await fetch(`${BASE_URL}/hello`);
        const listResponse = await fetch(`${BASE_URL}/list-s3`);

        if (!helloResponse.ok) {
          throw new Error(`Hello API error! Status: ${helloResponse.status}`);
        }
        if (!listResponse.ok) {
          throw new Error(`List S3 API error! Status: ${listResponse.status}`);
        }

        const helloResult = await helloResponse.json();
        const listResult = await listResponse.json();

        setHelloData(helloResult);
        setS3ListData(listResult);
      } catch (err) {
        setError(err.message); // Handle any error
      }
    };

    fetchApis();
  }, []);

  return <App helloData={helloData} s3ListData={s3ListData} error={error} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

reportWebVitals();
