import React, { FC, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
interface IFoodItemList {
  list:
  | {
    name: string;
    price: string;
    image: string;
    itemincart: string;
    cat: string;
  }[]
  | [];
}
interface ICartModal {
  onCheckoutClicked: () => void;
  onCloseClicked: () => void;
  onShowCartClicked: () => void;
  onHideCartClicked: () => void;
  value: boolean;
  foodlistreducer
  : IFoodItemList['list'],

}
const CartModal: FC<ICartModal> = ({
  onCheckoutClicked,
  onCloseClicked,
  onHideCartClicked,
  onShowCartClicked,
  foodlistreducer,
  value
}) => {
  const [cartItem, setCartItem] = useState<IFoodItemList["list"]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [discountOf, setDiscountOf] = useState<number>(0);


  useEffect(() => {
    // console.log('props', props.foodlistreducer);

    setCartItem(foodlistreducer.filter(data => data.itemincart !== '0'));
    findTotalBillAmount();
  }, []);

  const findTotalBillAmount = () => {
    var bill = 0;
    for (var i = 0; i < foodlistreducer.length; i++) {
      if (foodlistreducer[i].itemincart != '0') {
        bill = bill + (parseInt(foodlistreducer[i].price) * parseInt(foodlistreducer[i].itemincart));
      }
    }
    setTotalAmount(bill);
  }

  const getFinalAmountAfterAllDeduction = () => totalAmount - discountOf;
  return (
    <Modal show={value} onHide={onHideCartClicked()}>
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>
      {
        cartItem.map((item) => {
          return <div className="container">
            <Modal.Body>{item.name}</Modal.Body>
            <Modal.Body>{item.itemincart}</Modal.Body>
            <Modal.Body>{item.price}</Modal.Body>
          </div>
        })
      }

      <Modal.Footer>
        <Modal.Body>Total Amount</Modal.Body>
        <Modal.Body>-</Modal.Body>
        <Modal.Body>{totalAmount}</Modal.Body>
      </Modal.Footer>

      <Modal.Footer>
        <Modal.Body>Discount</Modal.Body>
        <Modal.Body>-</Modal.Body>
        <Modal.Body> <input type="number" placeholder="0" min="0" value={discountOf}
          onChange={(e) => setDiscountOf(parseInt(e.target.value))}
        />  </Modal.Body>
      </Modal.Footer>

      <Modal.Footer>
        <Modal.Body>Total Amount</Modal.Body>
        <Modal.Body>-</Modal.Body>
        <Modal.Body>{getFinalAmountAfterAllDeduction()}</Modal.Body>
      </Modal.Footer>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            onCloseClicked();
          }}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onCheckoutClicked();
          }}>
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const mapStateToProps = (state: any) => {
  console.log('onWhatState', state);

  return state
}

export default connect(mapStateToProps, null)(CartModal);
