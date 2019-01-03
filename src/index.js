import React from "react";
import ReactDOM from "react-dom";
import "./index_style.css";
// import registerServiceWorker from "./registerServiceWorker";
import AuthMonitor from "./components/AuthMonitor";
import {Provider, Subscribe} from "unstated";
import Apollo from './components/Apollo'
import LoginPage from './components/account/LoginPage'
import RegistrationPage from "./components/account/RegistrationPage";
import Home from './components/Home'
import {Router, Route, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import GroupView from './components/GroupView'
import Groups from "./components/Groups";
import UserView from "./components/UserView";
import Nav from './components/Nav';
import AccountPage from './components/account/AccountPage'
import About from './components/About'
import CreateGroup from './components/CreateGroup'

import {ReviewList} from "./components/Reviews";
import {getReviewsForTarget, getReviews, getReviewsForUserGroups} from "./apis/query";
import Querier from "./apis/Querier";

const history = createBrowserHistory()
export {history}
//import Formiks => account, register, forgot PW;
{/*</GetReviews>*/
}
{/*<Apollo idToken={auth.state.idToken}>*/
}

ReactDOM.render(
    <Router history={history}>
        <Provider>
            <Subscribe to={[AuthMonitor]}>
                {auth => (<React.Fragment>
                    <Nav/>
                    <Switch>
                        <Route exact path="/"
                               component={(props) => <Querier {...props} query={getReviews} prop={'reviews'}>
                                   {state => {

                                       return <div>
                                           <h1>All thoughts we placed</h1>
                                           <ReviewList reviews={state.data} user={auth.state.lupa_user}
                                                          showmore={true}/></div>
                                   }
                                   }
                               </Querier>}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/groups" component={() => <Groups user={auth.state.lupa_user}/>}/>
                        {/*<Route exact path="/reviews/:type?/:target?" component={() => <GetReviews><Reviews /></GetReviews>}/>*/}
                        <Route exact path="/creategroup" component={CreateGroup}/>
                        <Route exact path="/thread"
                               component={() => <Querier query={() => getReviewsForTarget("whoooores")}
                                                         prop={'reviewsForTarget'}>
                                   {state => {
                                       console.log("STTAET", state)

                                       return <ReviewList reviews={state.data} user={auth.state.lupa_user}/>
                                   }
                                   }
                               </Querier>}
                        />
                        <Route exact path="/userreviews" component={() => <>
                            <Querier query={getReviewsForUserGroups} prop={'reviewsForUserGroups'}>
                                {state => {
                                    console.log("STTAET", state)

                                    return <ReviewList reviews={state.data} user={auth.state.lupa_user}/>
                                }

                                }
                            </Querier></>}

                        />
                        <Route exact path="/account" component={() => <AccountPage
                            user={auth.state.user}
                            lupa_user={auth.state.lupa_user}
                        />}/>
                        <Route exact path="/register" component={RegistrationPage}/>
                        <Route exact path="/user/:name"
                               component={(props) => <UserView {...props} user={auth.state.lupa_user}/>}/>

                        <Route exact path="/group/:name"
                               component={(props) => <GroupView {...props} user={auth.state.lupa_user}/>}/>
                        <Route
                            component={() => (
                                <div>Couldn't find the page/url you're looking for</div>
                            )}
                        />
                    </Switch>
                </React.Fragment>)}
            </Subscribe>
        </Provider>
    </Router>,
    document.getElementById("root")
);
// registerServiceWorker();
