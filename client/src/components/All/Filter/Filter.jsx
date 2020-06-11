import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { Field, reduxForm, SubmissionError } from 'redux-form'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 5 },
};
const formTailLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 8, offset: 0 },
};


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

const AllFilter = (props) => {
  const { handleSubmit, reset, pristine,
    submitting, realtorId, updateCertainRealtor,
    fetchFilteredData, paginationCurrent, limit, fetchData
  } = props;
  const submit = (values) => {
    fetchFilteredData(paginationCurrent, limit, values);
  }
  return (
    <div>
      <h4>Фильтрация:</h4>
      <form onSubmit={handleSubmit(submit)} name="horizontal_login" layout="inline" >
        <Field
          name="lastname"
          label={"Фамилия"}
          type={"text"}
          component={renderField(Input)}
          hasFeedback
        />

        <FormItem {...formTailLayout}>
          <Button type="primary" htmlType="submit" disabled={pristine || submitting} style={{ marginRight: "10px" }}>
            Показать
        </Button>

          <Button disabled={pristine || submitting} onClick={reset}>
            Очистить все
        </Button>
          <Button onClick={(e) => { fetchData(paginationCurrent, limit) }}>
            Показать всех
        </Button>
        </FormItem>

      </form>
    </div>
  );
}
const ReduxAllFilter = reduxForm({
  form: 'filter'
})(AllFilter)

export default ReduxAllFilter;