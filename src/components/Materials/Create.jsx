import React from 'react';
import { slideActions } from "../../actions/SlideActions";
import { bookActions } from "../../actions/BookActions";
import { videoActions } from "../../actions/VideoActions";
import { articleActions } from "../../actions/ArticleActions";
import { success, error } from "../../helpers/Notification";
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";

import {
  Modal,
  Form,
  Input,
  Button,
  Tooltip,
  Row,
  Col,
  Alert,
  Select,
  Divider,
  message,
  Upload,
} from 'antd';
import {QuestionCircleOutlined, UploadOutlined} from '@ant-design/icons';
import { useState } from "react";
const { Option } = Select;
const { TextArea } = Input;
const Create = ({visible, onCancel, onCreate, createButton}) => {
  Form.useForm ();
  const [ materials, setMaterials ] = useState([]);
  const [ category, setCategory ] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [link, setLink] = useState("");
  const [uploadID, setUploadID] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const onFinishFailed = errorInfo => {
    console.log ('Failed:', errorInfo);
  };
  let categoryList = materials.map((material) => {
		return (
			<option key={material.id} value={material.id}>{material.title}</option>
		)
	}, this);
  function handleChange(value) {
    categoryList = null;
  }
  function handleSelect(value) {
    setMaterials([])
    setCategory(null)
    switch(value) {
      case "books":
        setIsVideo(false);
        bookActions.fetchBooks().then((response) => {
          if(response.status !== 200){
            error("Something Went Wrong")
            setMaterials([])
          } else {
            setMaterials(response.data)
          }
         
        });
        break;
      case "slides":
        setIsVideo(false);
        slideActions.fetchSlides().then((response) => {
          if(response.status !== 200){
            error("Something Went Wrong")
            setMaterials([])
          } else {
            setMaterials(response.data)
          }
         
        });
        break;
      case "articles":
        setIsVideo(false);
        articleActions.fetchArticles().then((response) => {
          if(response.status !== 200){
            error("Something Went Wrong")
            setMaterials([])
          } else {
            setMaterials(response.data)
          }
         
        });
        break;
      case "videos":
        setIsVideo(true);
        videoActions.fetchVideos().then((response) => {
          if(response.status !== 200){
            error("Something Went Wrong")
            setMaterials([])
          } else {
            setMaterials(response.data)
          }
         
        });
        break;
      default:
        // code block
    }
  }

  const handleFinish = (values) => {
    if(!isVideo){
      values.link = link;
    }
    values.uploadID = uploadID;
    console.log(values);
    onCreate(values);
  }

  const handleUpload = () => {
    setUploading(true);
    var file = fileList[0];
    const storage = getStorage();
    var fileName = "materials/"+file.uid;
    const storageRef = ref(storage, fileName); 

    uploadBytes(storageRef, file).then((snapshot) => {
      setUploading(false);
      setUploaded(true);
      getDownloadURL(storageRef).then((url)=>{
        console.log(url);
        setLink(url);
        setUploadID(file.uid);
      })
    });
  };
  const props = {
    onRemove: file => {
      setUploaded(false);
      const storage = getStorage();
      const deleteRef = ref(storage, 'materials/'+file.uid);
      deleteObject(deleteRef).then(() => {
        setFileList([])
        setLink("");
      }).catch((err) => {
        setFileList([])
        setLink("");
        error("Error Deleting File From Storage")
      });
    },
    beforeUpload: file => {
      setUploaded(false);
      setLink("");
      setFileList([file])
      return false;
    },
    fileList,
  };

  return (
    <Modal
      title=""
      centered
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <div>
        <Row>
          <Col
            offset={2}
            span={20}
            style={{background: 'rgb(217, 217, 217)', height: 35}}
          >
            <b>
              <Alert message="Add New Material" type="default" />
            </b>
          </Col>
        </Row>
        <Divider />
        <Form
          name="basic"
          layout={'vertical'}
          initialValues={{typeID: category}}
          onFinish={handleFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col offset={3} span={18}>
              <Form.Item
                label={
                  <span>
                    Title&nbsp;
                    <Tooltip title="Material Title">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Material Title!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Description&nbsp;
                    <Tooltip title="Material Description">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Material Description!',
                    whitespace: true,
                  },
                ]}
              >
                <TextArea />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Author&nbsp;
                    <Tooltip title="Material Author">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="author"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Material Author!',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Organization&nbsp;
                    <Tooltip title="Material Title">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="organization"
                rules={[
                  {
                    required: false,
                    message: 'Please enter a Organization',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Type&nbsp;
                    <Tooltip title="Material Type">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'Please select Material Type!',
                    whitespace: true,
                  },
                ]}
              >
                <Select
                showSearch
                style={{ width: 200 }}
                autoClearSearchValue={true}
                placeholder="Select Material Type"
                optionFilterProp="children"
                onSelect={handleSelect}
                onChange={handleChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                  <Option value="books" >Book</Option>
                  <Option value="slides">Slide</Option>
                  <Option value="articles">Article</Option>
                  <Option value="videos">Video</Option>
                </Select>
                </Form.Item>

                <Form.Item
                label={
                  <span>
                    Choose Category&nbsp;
                    <Tooltip title="Category">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="typeID"
                rules={[
                  {
                    required: true,
                    message: 'Please select Category',
                    whitespace: true,
                  },
                ]}
              >
                <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select Category"
                optionFilterProp="children"
                defaultValue={null}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                  {categoryList}
                </Select>
                </Form.Item>

                {!isVideo ?
              <Form.Item
                name="upload"
                label={
                  <span>
                    File&nbsp;
                    <Tooltip title="Upload Material File">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                valuePropName="fileList"
                // getValueFromEvent={normFile}
              >
              <Upload {...props}>
                <Button disabled={uploaded} icon={<UploadOutlined />}>Select File</Button>
              </Upload>
              <Button
                type="primary"
                onClick={handleUpload}
                disabled={uploaded}
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                {uploading ? 'Uploading' : uploaded ? 'Uploaded' : 'Start Upload'}
              </Button>
              </Form.Item> : null}
              
              <Form.Item
                label={
                  <span>
                    Link&nbsp;
                    <Tooltip title="Material Link">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="link"
              >
               {!isVideo ? <span>{link}</span> : <TextArea placeholder="Enter Video Link" required/> }
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col offset={3} span={18}>
              <Divider />
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-right"
                  id="submit-button"
                  disabled={createButton}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default Create;
