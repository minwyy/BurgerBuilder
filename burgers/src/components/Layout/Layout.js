import React, { Component } from 'react';
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
            <Toolbar open={this.sideDrawOpenHandler}/>
            <SideDrawer 
            closed={this.sideDrawClosedHandler}
            open={this.state.showSideDrawer}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>     
        )
    }  
}


export default Layout;