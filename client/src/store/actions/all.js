import {
  TOGGLE_LOADING,
  SET_PAGINATION_TOTAL,
  SET_DATA,
  SET_PAGINATION_CURRENT,
  SET_SUBDIVISIONS,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  SET_DELETE_REALTOR_ID,
  SET_UPDATED_REALTOR,
  SET_DELETE_REALTOR
}
  from '../constants/all';
import dateConvertFromTimestamp from '../../common/dateConvertFromTimestamp ';
import { reset } from 'redux-form';
/*получить первую часть риэлторов */
export const fetchData = (page, limit) => {
  return async dispatch => {
    await dispatch(toggleLoading());
    fetch(`http://localhost:5000/api/realtors?page=${page}&limit=${limit}`)
      .then((response) => {
        return response.json();   //получили первую часть риэлторов 
      })
      .then((data) => {
        dateConvertFromTimestamp(data.results);
        dispatch(setPaginationTotal(data.total));
        dispatch(setData(data.results));
        dispatch(toggleLoading());

      })
  }
}
/*прелоадер */
export const toggleLoading = () => {
  return {
    type: TOGGLE_LOADING
  }
}
/*установить количество страниц */
export const setPaginationTotal = (total) => {
  return {
    type: SET_PAGINATION_TOTAL,
    total: total
  }
}
/*добавить риэлторов в store */
export const setData = (data) => {
  return {
    type: SET_DATA,
    data: data
  }
}
/*текущая страница в пагинации */
export const setPaginationCurrent = (current) => {
  return {
    type: SET_PAGINATION_CURRENT,
    current: current
  }
}
/*получение риэлторов при изменениии пагинации */
export const tableChange = (current, limit) => {
  return async dispatch => {
    await dispatch(toggleLoading());
    await dispatch(setPaginationCurrent(current));
    fetch(`http://localhost:5000/api/realtors?page=${current}&limit=${limit}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dateConvertFromTimestamp(data.results)
        dispatch(setData(data.results));
        dispatch(toggleLoading());

      });
  }
}
/*export const toggleDrawer = (realtorId) => {
  return {
    type: TOGGLE_DRAWER,
    realtorId: realtorId
  }
}*/
/*добавить подразделения в store */
export const setSubdivisions = (subdivisions) => {
  return {
    type: SET_SUBDIVISIONS,
    subdivisions: subdivisions
  }
}
/*порлучить с сервера подразделения */
export const fetchSubdivisions = () => {
  return dispatch => {
    fetch(`http://localhost:5000/api/subdivisions`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setSubdivisions(data));
      })
  }
}
/*открыть drawer */

export const openDrawer = (realtor_id) => {
  return {
    type: OPEN_DRAWER,
    realtor_id: realtor_id
  }
}
export const closeDrawer = () => {
  return {
    type: CLOSE_DRAWER
  }
}
export const setUpdatedRealtor = (data, realtor_id) => {
  return {
    type: SET_UPDATED_REALTOR,
    data: data,
    realtorId: realtor_id
  }
}
export const updateCertainRealtor = (realtor_id, data) => {
  return async dispatch => {
    let url = new URL(`http://localhost:5000/api/realtors/${realtor_id}`);
    let params = data;
    await Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url, {
      method: 'PATCH'
    })
      .then((response) => {
        return response.json();
      })
      .then((d) => {
        let dataCopy = { ...data };
        if (data.reg_date) {
          let date = new Date(data.reg_date * 1000);
          dataCopy.reg_date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }

        dispatch(setUpdatedRealtor(dataCopy, realtor_id));
        dispatch(reset('edit'));
        dispatch(closeDrawer());

      });
  }
}

export const setDeleteRealtorId = (realtorId) => {
  return {
    type: SET_DELETE_REALTOR_ID,
    realtorId: realtorId
  }
}
const setDeleteRealtor = (realtorId) => {
  return {
    type: SET_DELETE_REALTOR,
    realtorId: realtorId
  }


}

export const deleteRealtor = (realtorId) => {
  return dispatch => {
    fetch(`http://localhost:5000/api/realtors/${realtorId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        return response;
      })
      .then(() => {
        dispatch(setDeleteRealtor(realtorId)); //зафиксировать удаление в состоянии
      })

  }
}
/*Фильтрация */

export const fetchFilteredData = (page, limit, data) => {
  return async dispatch => {
    let url = new URL(`http://localhost:5000/api/realtors?page=${page}&limit=${limit}`);
    let params = data;
    await Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    await await dispatch(toggleLoading());
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setPaginationTotal(data.total));
        dispatch(reset('filter'));
        dispatch(setData(data.results));

        dispatch(toggleLoading());
      });
  }
}