import React, { Component } from 'react'
import LoadSpinner from "../loadSpinner/loadSpinner";
import { Button, Row, Col } from "antd";
import Table from "./List";
import Layout from "../Layout/Custom_Layout/Layout";
import Create from "./Create";
import { success, error } from "../../helpers/Notification";

export default class Index extends Component {
	constructor() {
    super();
    this.state = {
      types: [],
      isLoading: true,
      visible: false,
      createButton: false
    };
  }

  setCreateModalVisible = () => {
    this.setState({ visible: true });
  }

  // componentDidMount() {
  //   if(isAdmin()){
  //     vehicleTypeActions.fetchVehicleTypes().then(response => {
  //       this.setState({ types: response.data, isLoading: false });
  //     });
  //   }else{
  //     this.props.history.push("unauthorized")
  //   }
  // }

  handleCreate = values => {
    console.log ('Success:', values);
    // e.preventDefault();
    // const { form } = this.formRef.props;
    // form.validateFields((err, values) => {
    //   if (!err) {
    //     this.setState({ createButton: true });
    //     vehicleTypeActions.createVehicleType(values).then(response => {
    //       if (response.status === 200) {
    //         vehicleTypeActions.fetchVehicleTypes().then(response => {
    //           this.setState({ types: response.data, visible: false });
    //         });
    //         success("Vehicle type has been sucessfully created.");
    //       } else {
    //         error(
    //           response.data.error || "Something went wrong. Please try again."
    //         );
    //       }
    //       this.setState({ createButton: false });
    //     });
    //   }
    // });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  showTable = () => {
    const { types, isLoading } = this.state;
    if (isLoading) {
      return <LoadSpinner />;
    } else {
      return <Table table_data={types} />;
    }
  }

	render() {
		return (
      <Layout sidebarSelectedKey="article">
          <div>
            <Row style={{ padding: "1em 0 1em 0" }}>
              <Col offset={3} span={15}>
                <h5>Articles Information</h5>
              </Col>
              <Col span={3}>
                <Button
                  type="primary"
                  onClick={() => this.setCreateModalVisible()}
                  className="btn-right"
                >
                  Create
                </Button>
              </Col>
            </Row>

            <Row>
              <Col offset={3} span={18}>
                {this.showTable()}
              </Col>
            </Row>

            {this.state.visible && (
              <Create
                visible={this.state.visible}
                createButton={this.state.createButton}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
              />
            )}
          </div>
      </Layout>
		)
	}
}

