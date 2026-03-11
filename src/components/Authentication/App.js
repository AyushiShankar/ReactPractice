import { UserProvider } from './userContext';
import Navbar from './NavBar';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <UserProvider>
      <div className="app">
        <Navbar />
        <Dashboard />
      </div>
    </UserProvider>
  );
};

export default App;
