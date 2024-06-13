import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

function Result(props) {
  return (
    <CSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        完成本節測驗，總共 {props.totalNum} 題，答對 {props.correctNum} 題，請重新刷新頁面做其他測驗。
      </div>
    </CSSTransitionGroup>
  );
}

Result.propTypes = {
  correctNum: PropTypes.number.isRequired,
  totalNum: PropTypes.number.isRequired
};

export default Result;
