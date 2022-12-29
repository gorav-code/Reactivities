import { queryHelpers } from '@testing-library/react';
import { useField } from 'formik';
import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Form, Label } from 'semantic-ui-react';
 
//here are using keyword 'Partial' this will make every single property of 'ReactDatePickerProps' to optional
//so while creating its object we do not have to pass values for all properties
export default function MyDatePicker(props: Partial<ReactDatePickerProps>){
    const [field, meta, helpers] = useField(props.name!);
    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker 
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            /> 
            {meta.touched && meta.error? (
                <Label basic color='red'>{meta.error}</Label>
            ): null}
        </Form.Field>
    )
}