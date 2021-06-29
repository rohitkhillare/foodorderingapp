import React, { useEffect, useState } from 'react';
import './newform.css'
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
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
    foodlistreducer: IFoodItemList['list'],
    AddItemInList: any,
    categoryList: any
}


const AddnewItemform: React.FC<IProps> = ({ foodlistreducer, AddItemInList, categoryList }) => {
    const [getCategory, setCategory] = useState<string>();
    const [getProductName, setProductName] = useState<string>();
    const [getAmount, setAmount] = useState<string>();
    const [geturl, seturl] = useState<string>();

    useEffect(() => {

    }, []);
    return (
        <div className="formcontainer">
            <form>



                <div className="productname">
                    <label>Category</label>
                    <input type="text" required value={getCategory} onChange={(e) => { setCategory(e.target.value) }} />
                </div>

                <div className="productname">
                    <label>Product name </label>
                    <input type="text" maxLength={15} required value={getProductName} onChange={(e) => { setProductName(e.target.value) }} />
                </div>

                <div className="productname">
                    <label>Amount</label>
                    <input type="number" min="5" required value={getAmount} onChange={(e) => { setAmount(e.target.value) }} />
                </div>

                <div className="productname">
                    <label>url</label>
                    <input type="url" required value={geturl} onChange={(e) => { seturl(e.target.value) }} />
                </div>
                <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    e.preventDefault();
                }}>Add</button>
            </form>


        </div>
    );
};
const mapStateToProps = (state: IFoodItemList['list']) => {
    return state
}
export default connect(mapStateToProps, null)(AddnewItemform);