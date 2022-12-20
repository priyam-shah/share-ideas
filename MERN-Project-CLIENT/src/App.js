import React from "react";

// all components we are gonna use from material-ui
import { Container } from "@material-ui/core";

// we have to use react-router-dom to make our app multi-page
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home.js";
import Footer from "./components/Footer/Footer";
import Auth from "./components/Auth/Auth.js";
import Feedback from "./components/Feedback/Feedback.js";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
          <Route path="/feedback" exact component={Feedback} />
        </Switch>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
