import React from 'react'
import { Row, Col, Divider, Alert, Modal } from "antd";

const Show = ({showVisible, onCancel, scholarship}) => {
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
                <Alert message="Scholarship Information" type="default" />
              </b>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col offset={3} span={18}>
              <Alert
                message="Scholarship Title"
                description={scholarship.Title}
                type="info"
                showIcon
              />
              <Divider />
              <Alert
                message="Description"
                description={scholarship.description}
                type="info"
                showIcon
              />
               <Divider />
               <Alert
                message="Image Path"
                description={scholarship.imagePath}
                type="info"
                showIcon
              />
            </Col>
          </Row>
          <Divider />
        </div>
      </Modal>
  )
}

export default Show
