import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'
import { connect } from 'react-redux'

const orderSummary = (props) => {

   const orders = Object.keys(props.ingredients)
      .map(ingKey =>
         <li key={ingKey}><span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
      );

   return (
      <Auxiliary>
         <h3>Your Order</h3>
         <p>A delicious burger with the following ingredients:</p>
         <ul>
            {orders}
         </ul>
         <p><strong>Total Price: {props.totalPrice}</strong></p>
         <p>Continue to checkout?</p>
         <Button clicked={props.purchaseCanceled} btnType="Danger">CANCEL</Button>
         <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>

      </Auxiliary>

   );
}

const mapStateToProps = state => {
   return {
      ingredients: state.ingd.ingredients,
      totalPrice: state.ingd.totalPrice
   }
}

export default connect(mapStateToProps)(orderSummary);