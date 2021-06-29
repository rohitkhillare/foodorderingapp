import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { FC, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import internal from "stream";
import fooditemlist from "../fooditem/foodList";
import CartModal from "../modal/CartModal";
import CartButton from "./CartButton";
import "./Fooditem.css";
import { Accordion, Card, Button, ListGroup } from 'react-bootstrap';
import AddnewItemform from "./AddnewItemform";
import { AddItemInList } from "../../action";

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
  AddItemInList: any
}
const FoodItemList: FC<IProps> = ({ foodlistreducer, AddItemInList }): JSX.Element => {

  const [getFoodItemList, setFoodItemList] = useState<IFoodItemList["list"]>(
    []
  );

  const [getFilteredData, setFilteredData] = useState<IFoodItemList["list"]>([]);
  const [categoryList, setCategoryList] = useState<any>([]);

  useEffect(() => {
    initList();
  }, []);

  const initList = (): void => {
    setFoodItemList(fooditemlist);
    console.log('fooditemlist', foodlistreducer);
    sortCategory();
  }


  const sortCategory = () => {
    const temp: string[] = [];
    temp.push('All');
    fooditemlist.forEach(element => {
      temp.push(element.cat);
    });
    console.log(temp);
    var uniqueElementSorting = temp.filter((element, index, self) => {
      return index === self.indexOf(element);
    });
    console.log('uniqueelements', uniqueElementSorting);
    var catListWithCheckBoxSelection: any = [];
    uniqueElementSorting.forEach(element => {
      catListWithCheckBoxSelection.push({ isChecked: false, category: element });
    });
    console.log('catlistwithcheckbox', catListWithCheckBoxSelection);

    setCategoryList(catListWithCheckBoxSelection);
  }


  const cartHandler = (index: number, action_type: number) => {
    var getCalculatedParam = 0;
    const tempOfData = [...getFoodItemList];
    //add....
    if (action_type == 1) {
      getCalculatedParam = parseInt(tempOfData[index].itemincart) + 1;
    } else {
      if (parseInt(tempOfData[index].itemincart) > 0) {
        getCalculatedParam = parseInt(tempOfData[index].itemincart) - 1;
      }
    }

    tempOfData[index].itemincart = getCalculatedParam.toString();

    setFoodItemList(tempOfData);
  };


  const handleOnClickCheckedItem = (index: number) => {
    const checkedItemList = [...categoryList];
    checkedItemList[index].isChecked = checkedItemList[index].isChecked == true ? false : true;
    setCategoryList(checkedItemList);
    return checkedItemList[index].isChecked;
  }


  const handleAllSelectionCheckBox = (item: any): void => {
    const data = foodlistreducer.filter(
      list => list.cat === item.category
    )
    setFoodItemList(data);
    setFilteredData(data);
  }

  const handleRemoveItemWhenUnCheck = (item: any): void => {
    const sortedData = getFoodItemList.filter(e => e.cat !== item.category)
    setFoodItemList(sortedData);
  }

  const addNewCheckedItemInList = (item: any): void => {
    const tempOfData: IFoodItemList['list'] = [...getFoodItemList];

    setFilteredData(getFoodItemList);
    const newfilteredvalue = foodlistreducer.filter(
      list => list.cat === item.category
    )
    console.log('when added more====>');
    console.log('OLD DATA', tempOfData);
    console.log('NEW DATA TO BE MERGED IN OLD', newfilteredvalue);
    for (var i = 0; i < tempOfData.length; i++) {
      newfilteredvalue.push(tempOfData[i]);
    }
    setFoodItemList(newfilteredvalue);

  }





  return (
    <Fragment>
      <div className="maincontainer">
        <div className="container">
          {getFoodItemList.map((item, index) => {
            return (
              <div className="itemcontainer">
                <img src={item.image} className={"productimage"} />
                <div className="centercontainer">
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
                <CartButton
                  onAddItemClicked={() => {
                    cartHandler(index, 1);
                  }}
                  onRemoveItemClicked={() => {
                    cartHandler(index, 2);
                  }}
                  changedValue={item.itemincart}
                />
              </div>
            );
          })}
        </div>

        <div className="filtercontainer">
          <h1>Menu Options</h1>

          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} eventKey="0">
                  Filter by Category
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <ListGroup>

                    {categoryList.map((item: any, index: number) => {
                      return <ListGroup.Item>
                        <div className="box">
                          <FormControlLabel
                            control={<Checkbox checked={item.isChecked} onChange={() => {

                              handleOnClickCheckedItem(index);

                              if (item.category === 'All') {
                                sortCategory();
                                setFilteredData([]);
                                setFoodItemList(foodlistreducer);
                              } else {
                                if (item.isChecked === false) {
                                  if (getFoodItemList.length > 0) {
                                    handleRemoveItemWhenUnCheck(item);
                                  } else {
                                    handleAllSelectionCheckBox(item);
                                  }
                                } else {
                                  if (getFilteredData.length > 0) {
                                    addNewCheckedItemInList(item);
                                  } else {
                                    handleAllSelectionCheckBox(item);
                                  }

                                }

                              }
                            }} name="gilad" />}
                            label={item.category}
                          />
                        </div>
                      </ListGroup.Item>
                    })}

                    <button
                      onClick={() => {
                        initList();
                      }}
                      className={'reset'}>CLEAR FILTER</button>

                    {/* <button
                      onClick={() => {
                        AddItemInList({ type: 'add', value: [] });
                        console.log(foodlistreducer);
                        
                      }}
                      className={'reset'}>CLEAR CART</button> */}
                  </ListGroup>

                </Card.Body>
              </Accordion.Collapse>
            </Card>
            {/* <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} eventKey="1">
                  Add new Product
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <AddnewItemform
                    categoryList={categoryList}
                    AddItemInList={AddItemInList} foodlistreducer={foodlistreducer} />
                </Card.Body>
              </Accordion.Collapse>
            </Card> */}

          </Accordion>
        </div>
      </div>

    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return state
}

export default connect(mapStateToProps, { AddItemInList })(FoodItemList);
