import { ListGroupItem } from "reactstrap";

import "../../../styles/cart-item.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const CartItem = ({ item }) => {
  const { id, title, price, image01, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  const incrementItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image01,
      })
    );
  };

  const decreaseItem = () => {
    dispatch(cartActions.removeItem(id));
  };

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };

  return (
    <ListGroupItem className="border-0 cart-item">
      <div className="cart-item-info d-flex gap-2">
        <img src={image01} alt="product-img" />

        <div className="cart-product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart-product-title">{title}</h6>
            <p className=" d-flex align-items-center gap-5 cart-product-price">
              {quantity}x <span>&#8377;{totalPrice}</span>
            </p>
            <div className=" d-flex align-items-center justify-content-between increase-decrease-btn">
              <span className="increase-btn" onClick={incrementItem}>
                <i class="ri-add-line"></i>
              </span>
              <span className="quantity">{quantity}</span>
              <span className="decrease-btn" onClick={decreaseItem}>
                <i class="ri-subtract-line"></i>
              </span>
            </div>
          </div>

          <span className="delete-btn" onClick={deleteItem}>
            <i class="ri-close-line"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
