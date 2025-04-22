import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useFetchApiManual } from './hooks/customHooks';

function App() {
  const url = 'https://dummyjson.com/products';
  const [count, setCount] = useState(0);
  const [fetchApiData, fetchedData, loading, error] = useFetchApiManual();

  useEffect(() => {
    console.log(' inside  ');
    fetchApiData(url);
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>
        {loading && (
          <>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </>
        )}
      </div>
      <h1>Vite + React</h1>
      {fetchedData && (
        <div className="card">
          <code>{JSON.stringify(fetchedData)}</code>
        </div>
      )}
    </>
  );
}

export default App;
