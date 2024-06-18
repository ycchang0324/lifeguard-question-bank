import React from 'react';
import PropTypes from 'prop-types';

function QuestionCount(props) {
  if(props.total != 0){
    return (
      <div className="questionCount">
        Question <span>{props.counter}</span> of <span>{props.total}</span>
      </div>
    );
  }
  else{
    return(
      <div></div>
    );
  }

}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;
