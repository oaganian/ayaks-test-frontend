import React from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';
import NewForm from "./Form/Form";
import { PropTypes } from 'prop-types';
//import NewFormSuccess from './Form/Succes/Success';
const { Content } = Layout;

const New = ({ addNewRealtor, successVisible, closeSuccessPopup, subdivisions }) => {

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Новый риэлтор</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: 'white' }}>
        <Row>
          <Col>
            <NewForm
              addNewRealtor={addNewRealtor}
              successVisible={successVisible}
              closeSuccessPopup={closeSuccessPopup}
              subdivisions={subdivisions}
            />
          </Col>
        </Row>
      </div>
    </Content>
  );
}
New.propTypes = {
  addNewRealtor: PropTypes.func.isRequired
}
export default New;