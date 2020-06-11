import React from 'react';
import { connect } from 'react-redux';
import All from './All';
import {
  fetchData, tableChange, fetchSubdivisions,
  openDrawer, closeDrawer, updateCertainRealtor,
  setDeleteRealtorId, deleteRealtor, fetchFilteredData
} from '../../store/actions/all';
/*компонент для сайд эффектов */
class AllContainer extends React.Component {
  componentDidMount() {
    this.props.fetchData(this.props.pagination.current, this.props.limit);
    this.props.fetchSubdivisions();

  }

  render() {
    return <All
      data={this.props.data}
      subdivisions={this.props.subdivisions}
      pagination={this.props.pagination}
      loading={this.props.loading}
      tableChange={this.props.tableChange}
      limit={this.props.limit}
      drawer={this.props.drawer}
      //drawerVisible={this.props.drawerVisible}
      //toggleDrawer={this.props.toggleDrawer}
      updateCertainRealtor={this.props.updateCertainRealtor}
      openDrawer={this.props.openDrawer}
      closeDrawer={this.props.closeDrawer}
      realtorDeleteId={this.props.realtorDeleteId}
      setDeleteRealtorId={this.props.setDeleteRealtorId}
      deleteRealtor={this.props.deleteRealtor}
      fetchFilteredData={this.props.fetchFilteredData}
      paginationCurrent={this.props.pagination.current}
      fetchData={this.props.fetchData}
      subdivisions={this.props.subdivisions}
    />
  }
}

const mapStateToProps = state => {
  return {
    data: state.allReducer.data,
    subdivisions: state.allReducer.subdivisions,
    pagination: state.allReducer.pagination,
    loading: state.allReducer.loading,
    page: state.allReducer.page,
    limit: state.allReducer.limit,
    drawer: state.allReducer.drawer,
    realtorDeleteId: state.allReducer.realtorDeleteId
    //drawerVisible: state.allReducer.drawer.visible
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchData: (page, limit) => {
      dispatch(fetchData(page, limit))
    },
    tableChange: (current, limit) => {
      dispatch(tableChange(current, limit))
    },
    /*  toggleDrawer: (realtorId) => {
        dispatch(toggleDrawer(realtorId));
      },*/
    fetchSubdivisions: () => {
      dispatch(fetchSubdivisions());
    },
    updateCertainRealtor: (realtorId, data) => {
      dispatch(updateCertainRealtor(realtorId, data));
    },
    openDrawer: (realtorId) => {
      dispatch(openDrawer(realtorId));
    },
    closeDrawer: () => {
      dispatch(closeDrawer());
    },
    setDeleteRealtorId: (realtorId) => {
      dispatch(setDeleteRealtorId(realtorId));
    },
    deleteRealtor: (realtorId) => {
      dispatch(deleteRealtor(realtorId));
    },
    /*фильтрация */
    fetchFilteredData: (page, limit, data) => {
      dispatch(fetchFilteredData(page, limit, data));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllContainer);
