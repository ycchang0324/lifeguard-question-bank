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
        完成本節測驗，請點選重新選擇題庫進行其他章節測驗。
      </div>
    </CSSTransitionGroup>
  );
}

Result.propTypes = {
};

export default Result;
