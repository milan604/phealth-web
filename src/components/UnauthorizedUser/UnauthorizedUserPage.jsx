import React, {Component} from "react";
import { Result } from 'antd';
import CustomLayout from "../Layout/Custom_Layout/Layout";

class UnauthorizedUser extends Component {
  render(){
    return(
      <CustomLayout>
        <Result 
          status="403"
          title="403"
          subTitle= "Sorry, you are not authorized to access this page."
        />
      </CustomLayout>
    )
  }
}
export default UnauthorizedUser;