import { useContext, useState } from "react";

import Checkout from "../Cart/Checkout";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderBtnHandler = () => {
    setIsCheckout(true);
  };

  const onSubmitHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      `${process.env.REACT_APP_FIREBASE_DB_URL}/orders.json`,
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          items: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !isSubmitted && (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout && (
            <Checkout onConfirm={onSubmitHandler} onCancel={props.onClose} />
          )}
          {!isCheckout && (
            <div className={classes.actions}>
              <button
                className={classes["button--alt"]}
                onClick={props.onClose}
              >
                Close
              </button>
              {hasItems && (
                <button className={classes.button} onClick={orderBtnHandler}>
                  Order
                </button>
              )}
            </div>
          )}
        </>
      )}
      {isSubmitting && <p>Sending...</p>}
      {isSubmitted && (
        <div className={classes.actions}>
          <p>Order placed successfully!</p>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
