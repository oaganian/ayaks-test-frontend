import React from 'react';
import { Popover, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
const { Text } = Typography;

const NewFormSuccess = ({ successVisible, closeSuccessPopup }) => {
  const onClose = (e) => {
    e.preventDefault();
    closeSuccessPopup();
  }
  return (
    <Popover
      content={
        <div>
          <p style={{ color: 'green' }}><CheckCircleOutlined /> <Text>Риэлтор успешно добавлен!</Text></p>
          <a onClick={onClose}>Закрыть</a>
        </div >
      }
      visible={successVisible}
    >

    </Popover >
  );
}

export default NewFormSuccess;