import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Headerbar from "./components/header/Headerbar";
import FoodItemList from "./components/ui/FoodITemList";
const App = (props: any) => {
  useEffect(() => {

 
    
  }, []);
  return (
    <Fragment>
      <Headerbar foodlistreducer={props.foodlistreducer} />
      <main>
        <FoodItemList
          AddItemInList={props.AddItemInList}
          foodlistreducer={props.foodlistreducer} />
      </main>
    </Fragment>
  );
}

const mapStateToProps = (state: any) => {
  console.log('THE STATE', state);

  return state
}
export default connect(mapStateToProps, null)(App);
