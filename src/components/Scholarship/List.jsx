import React, { Component } from "react";
import { Table, Divider, Modal, Tooltip } from "antd";
import Show from "./Show";
import Edit from "./Edit";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { success, error } from "../../helpers/Notification";
import { scholarshipActions } from "../../actions/ScholarshipActions";

const { confirm } = Modal;

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scholarships: props.table_data,
      editVisible: false,
      showVisible: false,
      editButton: false,
      scholarship: {},
    };
  }

  setShowModalVisible = (scholarship) => {
    this.setState({ showVisible: true });
    this.setState({ scholarship });
  };

  setEditModalVisible = (scholarship) => {
    this.setState({ editVisible: true });
    this.setState({ scholarship });
  };

  handleCancel = () => {
    this.setState({ editVisible: false, showVisible: false });
  };

  deleteScholarship = (scholarshipId) => {
    scholarshipActions.deleteScholarship(scholarshipId).then((response) => {
      if (response.status === 200) {
        scholarshipActions.fetchScholarships().then((response) => {
          this.setState({ scholarships: response.data });
          success("Scholarship has been sucessfully deleted.");
        });
      } else {
        error(response.data.error || "Something went wrong. Please try again.");
      }
    });
  };

  showConfirm = (scholarship) => {
    confirm({
      title: "Do you Want to delete this scholarship ?",
      content: `Scholarship title =>  ${scholarship.title}`,
      onOk: () => this.deleteScholarship(scholarship.id),
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
        scholarshipActions.updateScholarship(values, this.state.scholarship.id).then((response) => {
          if (response.status === 200) {
            scholarshipActions.fetchScholarships().then((response) => {
              this.setState({
                scholarships: response.data,
                editVisible: false,
              });
            });
            success("Scholarship has been sucessfully updated.");
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
      this.setState({ scholarships: this.props.table_data });
    }
  }

  render() {
    const columns = [
      {
        title: "Scholarship Title",
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
              <Tooltip title="`View Scholarship">
                <Link onClick={() => this.setShowModalVisible(record)}>
                  <EyeOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Edit Scholarship">
                <Link onClick={() => this.setEditModalVisible(record)}>
                  <EditOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Delete Scholarship">
                <Link onClick={() => this.showConfirm(record)}>
                  <DeleteOutlined />
                </Link>
              </Tooltip>
            </span>
          );
        },
      },
    ];
    const { scholarships } = this.state;

    return (
      <div>
        <Table
          columns={columns}
          dataSource={scholarships}
          rowKey={(column) => column.id}
          bordered
        />

        {this.state.editVisible && (
          <Edit
            editVisible={this.state.editVisible}
            onCancel={this.handleCancel}
            onEdit={this.handleEdit}
            scholarship={this.state.scholarship}
            editButton={this.state.editButton}
          />
        )}

        {this.state.showVisible && (
          <Show
            showVisible={this.state.showVisible}
            onCancel={this.handleCancel}
            scholarship={this.state.scholarship}
          />
        )}
      </div>
    );
  }
}
