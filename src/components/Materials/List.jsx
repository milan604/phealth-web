import React, {Component} from 'react';
// import {materialActions} from '../../actions/materialActions';
import {Table, Divider, Modal, Tooltip, Space, Spin} from 'antd';
import Show from './Show';
import Edit from './Edit';
import {Link} from 'react-router-dom';
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {success, error} from '../../helpers/Notification';
import { materialActions } from "../../actions/MaterialActions";
import { getStorage, ref, deleteObject } from "firebase/storage";

const {confirm} = Modal;

export default class List extends Component {
  constructor (props) {
    super (props);
    this.state = {
      materials: props.table_data,
      editVisible: false,
      showVisible: false,
      editButton: false,
      material: {},
      isLoading: false,
    };
  }

  setShowModalVisible = material => {
    this.setState ({showVisible: true});
    this.setState ({material});
  };

  setEditModalVisible = material => {
    this.setState ({editVisible: true});
    this.setState ({material});
  };

  handleCancel = () => {
    this.setState ({editVisible: false, showVisible: false});
  };

  deleteMaterial = (materialId, uploadID) => {
    this.setState({
      isLoading: true
    })
    const storage = getStorage();
      const deleteRef = ref(storage, 'materials/'+uploadID);
      deleteObject(deleteRef).then(() => {
        materialActions.deleteMaterial (materialId).then (response => {
          if (response.status === 200) {
            materialActions.fetchMaterials ().then (response => {
              this.setState ({materials: response.data});
              success ('Material has been sucessfully deleted.');
            });
          } else {
            error (
              response.data.error || 'Something went wrong. Please try again.'
            );
          }
        });
        this.setState({
          isLoading: false
        })
      }).catch((err) => {
        error("Error Deleting File From Storage")
        materialActions.deleteMaterial (materialId).then (response => {
          if (response.status === 200) {
            materialActions.fetchMaterials ().then (response => {
              this.setState ({materials: response.data});
              success ('Material has been sucessfully deleted.');
            });
          } else {
            error (
              response.data.error || 'Something went wrong. Please try again.'
            );
          }
        });
        this.setState({
          isLoading: false
        })
      });
  };

  showConfirm = material => {
    confirm ({
      title: 'Do you Want to delete this material ?',
      content: `Material title =>  ${material.title}`,
      onOk: () => this.deleteMaterial (material.id, material.uploadID),
      onCancel () {
        console.log ('Cancel');
      },
    });
  };

  formatValues = values => {
    Object.entries (values).forEach (([key, value]) => {
      if (!value) {
        delete values[key];
      }
    });
    return values;
  };

  handleEdit = (values) => {
    this.setState({ editButton: true });
        materialActions.updateMaterial(values, this.state.material.id).then((response) => {
          if (response.status === 200) {
            materialActions.fetchMaterials().then((response) => {
              this.setState({
                materials: response.data,
                editVisible: false,
              });
            });
            success("Material has been sucessfully updated.");
          } else {
            error(
              response.data.error || "Something went wrong. Please try again."
            );
          }
          this.setState({ editButton: false });
        });
  };

  componentDidUpdate (prevProps) {
    if (this.props.table_data !== prevProps.table_data) {
      this.setState ({materials: this.props.table_data});
    }
  }

  render () {
    const columns = [
      {
        title: 'Material Tittle',
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
              <Tooltip title="`View Material">
                <Link onClick={() => this.setShowModalVisible (record)}>
                  <EyeOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              {/* <Tooltip title="Edit Material">
                <Link onClick={() => this.setEditModalVisible (record)}>
                  <EditOutlined />
                </Link>
              </Tooltip> */}
              <Divider type="vertical" />
              <Tooltip title="Delete Material">
                <Link onClick={() => this.showConfirm (record)}>
                  <DeleteOutlined />
                </Link>
              </Tooltip>
            </span>
          );
        },
      },
    ];
    const {materials} = this.state;

    return (
      <div>
        {this.state.isLoading ? <div style={{display: 'flex',alignItems: 'center',justifyContent:'center',zIndex:9999}}><Space size="middle">
            <Spin size="large" />
          </Space></div> : null}
        <Table
          columns={columns}
          dataSource={materials}
          rowKey={column => column.id}
          bordered
        />

        {this.state.editVisible &&
          <Edit
            editVisible={this.state.editVisible}
            onCancel={this.handleCancel}
            onEdit={this.handleEdit}
            material={this.state.material}
            editButton={this.state.editButton}
          />}

        {this.state.showVisible &&
          <Show
            showVisible={this.state.showVisible}
            onCancel={this.handleCancel}
            material={this.state.material}
          />}
      </div>
    );
  }
}
