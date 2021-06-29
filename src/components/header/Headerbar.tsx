import React, { Fragment, useState } from "react";
import CartModal from "../modal/CartModal";
import "./Header.css";
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
interface IProps {
  foodlistreducer: IFoodItemList['list']
}
const Headerbar: React.FC<IProps> = ({ foodlistreducer }) => {
  const [modalvisiblity, setModalVisiblity] = useState<boolean>();
  const [openCart, setOpenCart] = useState<number>();

  const toggle = () => setModalVisiblity(true);

  const toggleOnOpenCart = () => setOpenCart(1);
  const toggleOffOpenCart = () => setOpenCart(0);
  return (
    <Fragment>
      <header className={"header"}>
        <h1 className={"header-title"}>Food App</h1>

        <button
          onClick={() => {
            console.log('clicked');
            toggle();
            toggleOnOpenCart();
            console.log(modalvisiblity);
          }}
          className={"header-title"}
        >
          Cart
        </button>
      </header>
      {openCart === 1 ?
        <div className="container">
          <CartModal
            foodlistreducer={foodlistreducer}
            onCheckoutClicked={() => { }}
            onCloseClicked={() => {
              toggleOffOpenCart();
            }}
            onHideCartClicked={() => {
              //toggleOffOpenCart();
            }}
            onShowCartClicked={() => {
              toggleOnOpenCart();
              setModalVisiblity(true);
            }}
            value={true}
          />
        </div>
        : null
      }
    </Fragment>
  );
};

export default Headerbar;
