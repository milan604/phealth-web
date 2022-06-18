import React, { Component } from "react";
import LoadSpinner from "../loadSpinner/loadSpinner";
import { Button, Row, Col } from "antd";
import Table from "./List";
import Layout from "../Layout/Custom_Layout/Layout";
import Create from "./Create";
import { success, error } from "../../helpers/Notification";
import { vacancyActions } from "../../actions/VacancyActions";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      vacancies: [],
      isLoading: true,
      visible: false,
      createButton: false,
    };
  }

  setCreateModalVisible = () => {
    this.setState({ visible: true });
  };

  componentDidMount() {
    vacancyActions.fetchVacancies().then((response) => {
      if(response.status !== 200){
        error("Something Went Wrong")
        this.setState({ vacancies: [], isLoading: false });
      } else {
        this.setState({ vacancies: response.data, isLoading: false });
      }
      
    });
  }

  handleCreate = (values) => {
    
    var startDateM = values.date[0] 
    var endDateM = values.date[1] 
    values.startDate = startDateM.format('YYYY-MM-DD')
    values.endDate = endDateM.format('YYYY-MM-DD')

    this.setState({ createButton: true });
    vacancyActions.createVacancy(values).then((response) => {
      if (response.status === 200) {
        vacancyActions.fetchVacancies().then((response) => {
          this.setState({ vacancies: response.data, visible: false });
        });
        success("New Vacancy has been sucessfully created.");
      } else {
        error(
          response.data.error || "Something went wrong. Please try again."
        );
      }
      this.setState({ createButton: false });
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  showTable = () => {
    const { vacancies, isLoading } = this.state;
    if (isLoading) {
      return <LoadSpinner />;
    } else {
      return <Table table_data={vacancies} />;
    }
  };

  render() {
    return (
      <Layout sidebarSelectedKey="vacancy">
        <div>
          <Row style={{ padding: "1em 0 1em 0" }}>
            <Col offset={3} span={15}>
              <h5>Job Vacancy Information</h5>
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
    );
  }
}
