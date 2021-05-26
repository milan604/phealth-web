import React from 'react'
import { Row, Col, Divider, Alert, Modal } from "antd";

const Show = (showVisible, onCancel, material) => {
  return (
<Modal
        title=""
        centered
        visible={showVisible}
        onCancel={onCancel}
        footer={null}
      >
        <div>
          <br />
          <Row>
            <Col
              offset={2}
              span={20}
              style={{ background: "rgb(217, 217, 217)", height: 35 }}
            >
              <b>
                <Alert message="Material Information" type="default" />
              </b>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col offset={3} span={18}>
              <Alert
                message="Material Title"
                description={material.Title}
                type="info"
                showIcon
              />
              <Divider />
              <Alert
                message="Description"
                description={material.description}
                type="info"
                showIcon
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col offset={1} span={22}>
            <Alert
                message="Left Icon"
                description={<img src={material.logo} alt="logo" />}
                type="info"
                showIcon
              /> 
            </Col>
          </Row>
        </div>
      </Modal>
  )
}

export default Show
