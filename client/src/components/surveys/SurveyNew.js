import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = () => {

    const [showFormReview, setShowFormReview] = useState(false);

    const renderContent = function() {
        if (showFormReview){
            return <SurveyFormReview onCancel={() => setShowFormReview(false)} />;
        }
        return <SurveyForm onSurveySubmit={() => setShowFormReview(true)}/>
    }

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default reduxForm({
    form: 'surveyForm' // sobrescreve as configurações do redux-form e quando clica no botão de cancelar limpa os campos // sobrescreve o unmounted
})(SurveyNew);