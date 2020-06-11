import React from 'react';
import { connect } from 'react-redux';
import New from './New';
import { addNewRealtor, closeSuccessPopup, fetchSubdivisions } from '../../store/actions/new';

class NewContainer extends React.Component {
  componentDidMount() {
    this.props.fetchSubdivisions();
  }
  render() {
    return (
      <New
        addNewRealtor={this.props.addNewRealtor}
        successVisible={this.props.successVisible}
        closeSuccessPopup={this.props.closeSuccessPopup}
        subdivisions={this.props.subdivisions}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    successVisible: state.newReducer.successVisible,
    subdivisions: state.newReducer.subdivisions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewRealtor: (newRealtor) => {
      dispatch(addNewRealtor(newRealtor));
    },
    closeSuccessPopup: () => {
      dispatch(closeSuccessPopup());
    },
    fetchSubdivisions: () => {
      dispatch(fetchSubdivisions());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewContainer);