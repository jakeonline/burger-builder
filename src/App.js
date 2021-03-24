import React, { Component, Suspense, lazy } from 'react'
// import { render } from '@testing-library/react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './containers/Checkout/Checkout'
import { Redirect, Route, Switch } from 'react-router-dom';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import Spinner from './components/UI/Spinner/Spinner'

class App extends Component {

  componentDidMount() {
    this.props.onCheckAuthState();
  }

  render() {

    const Auth = lazy(() => import('./containers/Auth/Auth'))
    const Checkout = lazy(() => import('./containers/Checkout/Checkout'))
    const Orders = lazy(() => import('./containers/Orders/Orders'))
    const Logout = lazy(() => import('./containers/Auth/Logout/Logout'))

    let routes = (
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Layout >
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/logout" component={Logout} />
              <Route path="/auth" component={Auth} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </Layout>
      );
    }

    return (
      <div>
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
