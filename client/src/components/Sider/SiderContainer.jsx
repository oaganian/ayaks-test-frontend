import { connect } from 'react-redux';
import AppSider from './Sider';
import { collapse } from '../../store/actions/sider';

const mapStateToProps = state => {
  return {
    collapsed: state.siderReducer.collapsed
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onCollapse: () => {
      dispatch(collapse());
    }
  }
}
let AppSiderContainer = connect(mapStateToProps, mapDispatchToProps)(AppSider);

export default AppSiderContainer;