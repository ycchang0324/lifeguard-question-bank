import React from 'react';
import PropTypes from 'prop-types';

function AnswerOption(props) {
  return (
    <li className="answerOption">
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={props.checkedId === props.id} // 使用傳遞的 id 確保唯一性
        id={props.id}
        value={props.answerType}
        onChange={props.onAnswerSelected}
      />
      <label className="radioCustomLabel" htmlFor={props.id}>
        {props.answerContent}
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired, // 新增 id 的 PropTypes
  checkedId: PropTypes.string.isRequired, // 新增 checkedId 的 PropTypes
  onAnswerSelected: PropTypes.func.isRequired,
};

export default AnswerOption;
