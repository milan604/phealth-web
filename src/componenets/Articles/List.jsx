import React, {Component} from 'react';
// import {articleActions} from '../../actions/articleActions';
import {Table, Divider, Modal, Tooltip} from 'antd';
import Show from './Show';
import Edit from './Edit';
import {Link} from 'react-router-dom';
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {success, error} from '../../helpers/Notification';

const {confirm} = Modal;

export default class List extends Component {
  constructor (props) {
    super (props);
    this.state = {
      articles: props.table_data,
      editVisible: false,
      showVisible: false,
      editButton: false,
      article: {},
    };
  }

  setShowModalVisible = article => {
    this.setState ({showVisible: true});
    this.setState ({article});
  };

  setEditModalVisible = article => {
    this.setState ({editVisible: true});
    this.setState ({article});
  };

  handleCancel = () => {
    this.setState ({editVisible: false, showVisible: false});
  };

  // deleteArticle = articleId => {
  //   articleActions.deleteArticle (articleId).then (response => {
  //     if (response.status === 204) {
  //       articleActions.fetchArticles ().then (response => {
  //         this.setState ({articles: response.data});
  //         success ('Article has been sucessfully deleted.');
  //       });
  //     } else {
  //       error (
  //         response.data.error || 'Something went wrong. Please try again.'
  //       );
  //     }
  //   });
  // };

  // showConfirm = article => {
  //   confirm ({
  //     title: 'Do you Want to delete this article ?',
  //     content: `Article title =>  ${article.title}`,
  //     onOk: () => this.deleteArticle (article.id),
  //     onCancel () {
  //       console.log ('Cancel');
  //     },
  //   });
  // };

  formatValues = values => {
    Object.entries (values).forEach (([key, value]) => {
      if (!value) {
        delete values[key];
      }
    });
    return values;
  };

  handleEdit = e => {
    // e.preventDefault ();
    // const {form} = this.formRef.props;
    // form.validateFields ((err, values) => {
    //   if (!err) {
    //     this.setState ({editButton: true});
    //     articleActions
    //       .updateArticle (
    //         this.formatValues (values),
    //         this.state.article.id
    //       )
    //       .then (response => {
    //         if (response.status === 200) {
    //           articleActions.fetchArticles ().then (response => {
    //             this.setState ({
    //               articles: response.data,
    //               editVisible: false,
    //             });
    //           });
    //           success ('Article has been sucessfully updated.');
    //         } else {
    //           error (
    //             response.data.error || 'Something went wrong. Please try again.'
    //           );
    //         }
    //         this.setState ({editButton: false});
    //       });
    //   }
    // });
  };

  componentDidUpdate (prevProps) {
    if (this.props.table_data !== prevProps.table_data) {
      this.setState ({articles: this.props.table_data});
    }
  }

  render () {
    const columns = [
      {
        title: 'Article Tittle',
        dataIndex: 'title',
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <Tooltip title="`View Article">
                <Link onClick={() => this.setShowModalVisible (record)}>
                  <EyeOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Edit Article">
                <Link onClick={() => this.setEditModalVisible (record)}>
                  <EditOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Delete Article">
                <Link onClick={() => this.showConfirm (record)}>
                  <DeleteOutlined />
                </Link>
              </Tooltip>
            </span>
          );
        },
      },
    ];
    const {articles} = this.state;

    return (
      <div>
        <Table
          columns={columns}
          dataSource={articles}
          rowKey={column => column.id}
          bordered
        />

        {this.state.editVisible &&
          <Edit
            editVisible={this.state.editVisible}
            onCancel={this.handleCancel}
            onEdit={this.handleEdit}
            article={this.state.article}
            editButton={this.state.editButton}
          />}

        {this.state.showVisible &&
          <Show
            showVisible={this.state.showVisible}
            onCancel={this.handleCancel}
            article={this.state.article}
          />}
      </div>
    );
  }
}
