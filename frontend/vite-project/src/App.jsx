import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Cities from './cities/pages/Cities';
import AddCity from './cities/pages/AddCity';
import { QueryClient, QueryClientProvider } from "react-query";
import './App.css'
import Users from './users/pages/Users';
import Authenticate from './users/pages/Authenticate';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Switch>

      <Route path="/" exact>
        <Cities />
      </Route>
      <Route path="/users" exact>
        <Users />
      </Route>

      <Route path="/cities/new" exact>
        <AddCity />
      </Route>
      <Route path="/auth">
        <Authenticate/>
      </Route>
      <Redirect to="/" />
      </Switch>
    </Router>

</QueryClientProvider >

  );
}

export default App
