import React from 'react'
import { Row, Col, Divider, Alert, Modal } from "antd";

const Show = ({showVisible, onCancel, book}) => {
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
                <Alert message="Book Information" type="default" />
              </b>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col offset={3} span={18}>
              <Alert
                message="Book Title"
                description={book.Title}
                type="info"
                showIcon
              />
              <Divider />
              <Alert
                message="Description"
                description={book.description}
                type="info"
                showIcon
              />
               <Divider />
               <Alert
                message="Image Path"
                description={book.imagePath}
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
