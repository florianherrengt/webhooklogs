import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { LoginPage, LoginCallbackPage } from "./pages";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/auth" exact>
                    <LoginPage />
                </Route>
                <Route path="/auth/:provider/callback">
                    <LoginCallbackPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
