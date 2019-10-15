import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    {label: "Survey Title", name: "title"},
    {label: "Subject Line", name: "subject"},
    {label: "Email Body", name: "body"},
    {label: "Recipients List", name: "emails"}
];

const SurveyForm = (props) => {

    const renderFields = () => {
        return FIELDS.map(({ label, name }) => {
            return (<Field key={name} component={SurveyField} type="text" label={label} name={name} />);
        });
    }

    return (
        <div>
            <form onSubmit={props.handleSubmit(values => console.log(values))}>
                {renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                </button>
            </form>            
        </div>
    );
};

function validate(values) {
    const errors = {}; //Se tiver valores dentro deste objeto, é porque o formulario nao está valido

    errors.emails = validateEmails(values.emails || '');

    FIELDS.forEach(({ name }) => {
        if (!values[name]){
            errors[name] = 'You must provide a '+ name;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);