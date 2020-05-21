import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    
    sideDrawClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }
    
    sideDrawOpenHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer}})
    }
    
    render() {
        return (    
            <Aux>
            <Toolbar open={this.sideDrawOpenHandler} isAuth={this.props.isAuthenticated}/>
            <SideDrawer 
            closed={this.sideDrawClosedHandler}
            open={this.state.showSideDrawer}
            isAuth={this.props.isAuthenticated}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>     
        )
    }  
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, null) (Layout);