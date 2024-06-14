import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
  function renderAnswerOptions(option, index) {
    const id = `${props.questionId}-${index}`; // 使用 questionId 和索引組合生成唯一的 id
    return (
      <AnswerOption
        key={id} // 使用 id 作為 key 保證唯一性
        answerContent={option.content}
        answerType={option.type}
        id={id}
        checkedId={props.checkedId}
        onAnswerSelected={(e) => props.onAnswerSelected(e, id)} // 傳遞 id 給 onAnswerSelected
      />
    );
  }

  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
        <QuestionCount counter={props.questionId} total={props.questionTotal} />
        <Question content={props.question} />
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
      </div>
    </CSSTransitionGroup>
  );
}

Quiz.propTypes = {
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  checkedId: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
};

export default Quiz;
