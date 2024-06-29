import { UserProvider } from './context';
import Router from './router';

const App = () => {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
};

export default App;
