import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';



const control = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Curent price: <strong>${props.price.toFixed(2)}</strong></p>
        {control.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            add={()=>props.add(ctrl.type)} 
            remove={()=>props.remove(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button className={classes.OrderButton} disabled={!props.purchasable}>Order NOW</button>
   </div>
);

export default buildControls;