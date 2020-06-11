import React from 'react';
import { Layout, Breadcrumb, Table, Drawer, Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import ReduxAllForm from './Form/Form';
import ReduxAllFilter from './Filter/Filter';

const { Content } = Layout;
const All = (
  { data, pagination,
    loading, tableChange, limit,
    drawer, openDrawer, closeDrawer,
    subdivisions, updateCertainRealtor,
    setDeleteRealtorId, realtorDeleteId,
    deleteRealtor, fetchFilteredData, paginationCurrent, fetchData }
) => {

  const columns = [
    {
      title: 'Фамилия',
      dataIndex: 'lastname',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
    },
    {
      title: 'Подразделение',
      dataIndex: 'subdivision',
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'reg_date',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: () =>
        (
          <Popconfirm title="Вы уверены? Запись не подлежит восстановлению"
            icon={<QuestionCircleOutlined
              style={{ color: 'red' }} />}
            onConfirm={(e) => {
              deleteRealtor(realtorDeleteId);
            }}

            okText="Удалить"
            cancelText="Отмена"
          >
            <Button
              type="default"
              danger
              onClick={(e) => {
                setDeleteRealtorId(e.target.parentNode.parentNode.getAttribute('data-row-key'));
              }}>
              Удалить
            </Button>
          </Popconfirm>
        ),
    }
  ]

  return (

    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Список риэлторов</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: 'white' }}>

        <ReduxAllFilter
          fetchFilteredData={fetchFilteredData}
          paginationCurrent={paginationCurrent}
          limit={limit}
          fetchData={fetchData}
        />

        <Table
          style={{ marginTop: 30 }}
          columns={columns}
          rowKey={record => record.id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={(e) => { tableChange(e.current, limit) }}
          onRow={(r) => ({
            onDoubleClick: (e) => { openDrawer(r.id) } /*toggleDrawer(r.id)*/   // при нажатии нужно фиксировать id человека
          })}

        />
        <Drawer
          width={640}
          placement="right"
          closable={false}
          visible={drawer.visible}
          onClose={(e) => {
            closeDrawer();
          }}
        >
          <ReduxAllForm realtorId={drawer.realtorId}
            updateCertainRealtor={updateCertainRealtor}
            subdivisions={subdivisions}
          />
        </Drawer>
      </div>
    </Content>
  );
}


All.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lastname: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      subdivision: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  pagination: PropTypes.shape({
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }),
  loading: PropTypes.bool.isRequired,
  tableChange: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  // drawerVisible: PropTypes.bool.isRequired,
  // toggleDrawer: PropTypes.func.isRequired
}

export default All;