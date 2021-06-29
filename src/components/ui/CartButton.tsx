import React from "react";
import { FC } from "react";
import "./Addtocart.css";
interface ICartButtonProps {
  onAddItemClicked: () => void;
  onRemoveItemClicked: () => void;
  changedValue: string;
}
const CartButton: FC<ICartButtonProps> = ({
  onAddItemClicked,
  onRemoveItemClicked,
  changedValue = "0",
}): JSX.Element => {
  const handleAddItem = () => {
    onAddItemClicked();
  };

  const handleRemoveItem = () => {
    onRemoveItemClicked();
  };

  return (
    <div className="addtocartcontainer">
      <button onClick={handleRemoveItem} className={"addtocart"}>
        -
      </button>
      <input type="text" min="0" value={changedValue} className={"cartinput"} />
      <button onClick={handleAddItem} className={"addtocart"}>
        +
      </button>
    </div>
  );
};
export default CartButton;
