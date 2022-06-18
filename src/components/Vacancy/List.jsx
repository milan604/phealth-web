import React, { Component } from "react";
import { Table, Divider, Modal, Tooltip } from "antd";
import Show from "./Show";
import Edit from "./Edit";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { success, error } from "../../helpers/Notification";
import { vacancyActions } from "../../actions/VacancyActions";

const { confirm } = Modal;

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vacancies: props.table_data,
      editVisible: false,
      showVisible: false,
      editButton: false,
      vacancy: {},
    };
  }

  setShowModalVisible = (vacancy) => {
    this.setState({ showVisible: true });
    this.setState({ vacancy });
  };

  setEditModalVisible = (vacancy) => {
    this.setState({ editVisible: true });
    this.setState({ vacancy });
  };

  handleCancel = () => {
    this.setState({ editVisible: false, showVisible: false });
  };

  deleteVacancy = (vacancyId) => {
    vacancyActions.deleteVacancy(vacancyId).then((response) => {
      if (response.status === 200) {
        vacancyActions.fetchVacancies().then((response) => {
          this.setState({ vacancies: response.data });
          success("Vacancy has been sucessfully deleted.");
        });
      } else {
        error(response.data.error || "Something went wrong. Please try again.");
      }
    });
  };

  showConfirm = (vacancy) => {
    confirm({
      title: "Do you Want to delete this vacancy ?",
      content: `Vacancy title =>  ${vacancy.title}`,
      onOk: () => this.deleteVacancy(vacancy.id),
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  formatValues = (values) => {
    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        delete values[key];
      }
    });
    return values;
  };

  handleEdit = (values) => {
    this.setState({ editButton: true });
        vacancyActions.updateVacancy(values, this.state.vacancy.id).then((response) => {
          if (response.status === 200) {
            vacancyActions.fetchVacancys().then((response) => {
              this.setState({
                vacancies: response.data,
                editVisible: false,
              });
            });
            success("Vacancy has been sucessfully updated.");
          } else {
            error(
              response.data.error || "Something went wrong. Please try again."
            );
          }
          this.setState({ editButton: false });
        });
  };

  componentDidUpdate(prevProps) {
    if (this.props.table_data !== prevProps.table_data) {
      this.setState({ vacancies: this.props.table_data });
    }
  }

  render() {
    const columns = [
      {
        title: "Vacancy Title",
        dataIndex: "title",
      },
      {
        title: "Post",
        dataIndex: "post",
      },
      {
        title: "Location",
        dataIndex: "location",
      },
      {
        title: "Deadline",
        dataIndex: "endDate",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          return (
            <span>
              <Tooltip title="`View Vacancy">
                <Link onClick={() => this.setShowModalVisible(record)}>
                  <EyeOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Edit Vacancy">
                <Link onClick={() => this.setEditModalVisible(record)}>
                  <EditOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Delete Vacancy">
                <Link onClick={() => this.showConfirm(record)}>
                  <DeleteOutlined />
                </Link>
              </Tooltip>
            </span>
          );
        },
      },
    ];
    const { vacancies } = this.state;

    return (
      <div>
        <Table
          columns={columns}
          dataSource={vacancies}
          rowKey={(column) => column.id}
          bordered
        />

        {this.state.editVisible && (
          <Edit
            editVisible={this.state.editVisible}
            onCancel={this.handleCancel}
            onEdit={this.handleEdit}
            vacancy={this.state.vacancy}
            editButton={this.state.editButton}
          />
        )}

        {this.state.showVisible && (
          <Show
            showVisible={this.state.showVisible}
            onCancel={this.handleCancel}
            vacancy={this.state.vacancy}
          />
        )}
      </div>
    );
  }
}
