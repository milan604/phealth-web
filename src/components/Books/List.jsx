import React, { Component } from "react";
import { Table, Divider, Modal, Tooltip } from "antd";
import Show from "./Show";
import Edit from "./Edit";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { success, error } from "../../helpers/Notification";
import { bookActions } from "../../actions/BookActions";

const { confirm } = Modal;

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: props.table_data,
      editVisible: false,
      showVisible: false,
      editButton: false,
      book: {},
    };
  }

  setShowModalVisible = (book) => {
    this.setState({ showVisible: true });
    this.setState({ book });
  };

  setEditModalVisible = (book) => {
    this.setState({ editVisible: true });
    this.setState({ book });
  };

  handleCancel = () => {
    this.setState({ editVisible: false, showVisible: false });
  };

  deleteBook = (bookId) => {
    bookActions.deleteBook(bookId).then((response) => {
      if (response.status === 200) {
        bookActions.fetchBooks().then((response) => {
          this.setState({ books: response.data });
          success("Book has been sucessfully deleted.");
        });
      } else {
        error(response.data.error || "Something went wrong. Please try again.");
      }
    });
  };

  showConfirm = (book) => {
    confirm({
      title: "Do you Want to delete this book ?",
      content: `Book title =>  ${book.title}`,
      onOk: () => this.deleteBook(book.id),
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
        bookActions.updateBook(values, this.state.book.id).then((response) => {
          if (response.status === 200) {
            bookActions.fetchBooks().then((response) => {
              this.setState({
                books: response.data,
                editVisible: false,
              });
            });
            success("Book has been sucessfully updated.");
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
      this.setState({ books: this.props.table_data });
    }
  }

  render() {
    const columns = [
      {
        title: "Book Tittle",
        dataIndex: "title",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          return (
            <span>
              <Tooltip title="`View Book">
                <Link onClick={() => this.setShowModalVisible(record)}>
                  <EyeOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Edit Book">
                <Link onClick={() => this.setEditModalVisible(record)}>
                  <EditOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Delete Book">
                <Link onClick={() => this.showConfirm(record)}>
                  <DeleteOutlined />
                </Link>
              </Tooltip>
            </span>
          );
        },
      },
    ];
    const { books } = this.state;

    return (
      <div>
        <Table
          columns={columns}
          dataSource={books}
          rowKey={(column) => column.id}
          bordered
        />

        {this.state.editVisible && (
          <Edit
            editVisible={this.state.editVisible}
            onCancel={this.handleCancel}
            onEdit={this.handleEdit}
            book={this.state.book}
            editButton={this.state.editButton}
          />
        )}

        {this.state.showVisible && (
          <Show
            showVisible={this.state.showVisible}
            onCancel={this.handleCancel}
            book={this.state.book}
          />
        )}
      </div>
    );
  }
}
