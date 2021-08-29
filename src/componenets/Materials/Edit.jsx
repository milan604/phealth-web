import React from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Tooltip,
  Row,
  Col,
  Alert,
  Divider,
  Upload,
} from 'antd';
import {QuestionCircleOutlined, UploadOutlined} from '@ant-design/icons';

const Edit = ({editVisible, onCancel, onEdit, editButton, material}) => {
  Form.useForm ();

  const onFinishFailed = errorInfo => {
    console.log ('Failed:', errorInfo);
  };
  return (
    <Modal
      title=""
      centered
      visible={editVisible}
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
              <Alert message="Edit Material" type="default" />
            </b>
          </Col>
        </Row>
        <Divider />
        <Form
          name="basic"
          layout={'vertical'}
          initialValues={{title: material.title, description: material.description}}
          onFinish={onEdit}
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
                  {/* <Option value="books" >Book</Option>
                  <Option value="slides">Slide</Option>
                  <Option value="articles">Article</Option>
                  <Option value="videos">Video</Option> */}
                </Select>
                </Form.Item>
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
              </Form.Item>

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
                <span>{link}</span>
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
                  disabled={editButton}
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

export default Edit;
