import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Management System</h1>
      </header>
      <main className="app-content">
        <HomePage />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Task Management System</p>
      </footer>
    </div>
  );
}

export default App;
