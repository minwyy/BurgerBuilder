import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount () {
        this.props.onFecthOrders();
    }
    render () {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order id={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />
                ))
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToprops = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onFecthOrders: () => dispatch(actions.fetchOrder())
    }
}

export default connect(mapStateToprops, mapDispatchToProps) (withErrorHandler(Orders, axios));