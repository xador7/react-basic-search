import React, { ReactElement, FC} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Navigation from "./components/Navigation";
import Search from "./components/Search";
import NewUser from "./components/NewUser";
import UserDetails from "./components/UserDetails";

export interface IAppProps {}

const App: FC<IAppProps> = (): ReactElement => {
  return (
      <Router>
        <Navigation />
        <Routes>
            <Route path="/new-user" element={ <NewUser /> } />
            <Route path="/search" element={ <Search /> } />
            <Route path="/details/:id" element={ <UserDetails /> }/>
              {/*<Route index element={ <UserDetails /> } />*/}
              {/*<Route path=":id" element={ <UserDetails /> } />*/}
        </Routes>
      </Router>
  );
};

export default App;
