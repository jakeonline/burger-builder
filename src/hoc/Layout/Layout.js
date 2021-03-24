import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary'

import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClickedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = (prevState) => {
        this.setState({
            showSideDrawer: !prevState.showSideDrawer
        });
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar
                    sideDrawerClicked={this.sideDrawerToggleHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClickedHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <div>Backdrop</div>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.idToken,
        isAuthenticated: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Layout);