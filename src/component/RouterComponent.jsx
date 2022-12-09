import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListClientComponent from "./client/ListClientComponent";
import AddClientComponent from "./client/AddClientComponent";
import EditClientComponent from "./client/EditClientComponent";
import React from "react";

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/" exact component={ListClientComponent} />
                        <Route path="/client" component={ListClientComponent} />
                        <Route path="/create-client" component={AddClientComponent} />
                        <Route path="/edit-client" component={EditClientComponent} />
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;