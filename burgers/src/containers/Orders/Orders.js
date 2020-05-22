import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount () {
        this.props.onFecthOrders(this.props.token, this.props.userId);
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
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onFecthOrders: (token, userId) => dispatch(actions.fetchOrder(token, userId))
    }
}

export default connect(mapStateToprops, mapDispatchToProps) (withErrorHandler(Orders, axios));