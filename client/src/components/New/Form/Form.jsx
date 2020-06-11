import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Form, Input, Select, Button, DatePicker } from "antd";
//import moment from 'moment';
import NewFormSuccess from './Succes/Success';
import { formItemLayout, tailFormItemLayout } from '../../../common/FormLayout'
const FormItem = Form.Item;
const { Option } = Select;

const renderField = Component => ({ label, type, hasFeedback, input, meta: { touched, error }, children, ...rest }) => {
  return (
    <FormItem
      {...formItemLayout}
      label={label}
      hasFeedback={hasFeedback && touched && error}
      validateStatus={touched && error ? "error" : "success"}
      help={touched && error}
    >
      <Component {...input} type={type} {...rest} children={children} />
    </FormItem>
  );
}

let NewForm = props => {
  const { handleSubmit, reset, pristine,
    submitting, addNewRealtor, successVisible,
    closeSuccessPopup, subdivisions } = props
  const submit = ({ lastname, name, subdivisions_id, reg_date }) => {
    let error = {};
    let isError = false;
    if (!lastname || lastname === '') {
      error.lastname = 'Required!';
      isError = true;
    }
    if (!name || name === '') {
      error.name = 'Required!';
      isError = true;
    }
    if (!subdivisions_id || subdivisions_id === '') {
      error.subdivisions_id = 'Required!';
      isError = true;
    }
    if (!reg_date || reg_date === '') {
      error.reg_date = 'Required!';
      isError = true;
    }
    if (isError) {
      throw new SubmissionError(error);
    }
    else {
      // store.dispatch(reset('new'));
      let newRealtor = {
        lastname: lastname,
        name: name,
        subdivisions_id: parseInt(subdivisions_id),
        reg_date: reg_date._d.getTime() / 1000 | 0
      };
      addNewRealtor(newRealtor);
    }
  }
  return (
    <div>
      <NewFormSuccess
        successVisible={successVisible}
        closeSuccessPopup={closeSuccessPopup}
      />
      <form onSubmit={handleSubmit(submit)}
      >
        <Field
          name="lastname"
          label={"Фамилия"}
          type={"text"}
          component={renderField(Input)}
          hasFeedback

        />
        <Field
          name="name"
          label={"Имя"}
          type={"text"}
          component={renderField(Input)}
          hasFeedback
        />
        <Field
          label={"Подразделение"}
          name="subdivisions_id"
          component={renderField(Select)}
          type={'select'}
          hasFeedback
          onFocus={e => e.preventDefault()}
          onBlur={e => e.preventDefault()}

        >
          {(subdivisions) ? subdivisions.map(s => <Option key={s.id} value={s.id} >{s.name}</Option>) : ''}
        </Field>
        <Field
          label={'Дата регистрации'}
          name="reg_date"
          component={renderField(DatePicker)}
          onFocus={e => e.preventDefault()}
          onBlur={e => e.preventDefault()}
          type={"YYYY/MM/DD"}

        />
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
            Сохранить
        </Button>

          <Button disabled={pristine || submitting} onClick={reset}>
            Очистить все
        </Button>
        </FormItem>
      </form >
    </div>
  )
}

NewForm = reduxForm({
  form: 'new'
})(NewForm)

export default NewForm;
