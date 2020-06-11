import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Form, Input, Select, Button, DatePicker } from "antd";
import { formItemLayout, tailFormItemLayout } from '../../../common/FormLayout';

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

const AllForm = (props) => {
  const { handleSubmit, reset, pristine,
    submitting, realtorId, updateCertainRealtor,
    subdivisions } = props
  const submit = (values) => {
    let valuesCopy = { ...values };
    if (values.reg_date) {
      valuesCopy.reg_date = values.reg_date._d.getTime() / 1000 | 0
    }
    updateCertainRealtor(realtorId, valuesCopy);
  }
  return (
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
        <Button type="primary" htmlType="submit" disabled={pristine || submitting} style={{ marginRight: "10px" }}>
          Сохранить
        </Button>

        <Button disabled={pristine || submitting} onClick={reset}>
          Очистить все
        </Button>
      </FormItem>
    </form >
  );
}

const ReduxAllForm = reduxForm({
  form: 'edit'
})(AllForm)

export default ReduxAllForm;
