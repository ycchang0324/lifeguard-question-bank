import React, { Component } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import Section from './components/Section';
import './App.css';

const quizQuestionsMap = {
  // 第一章
  '0-0': () => import('./api/quizQuestions-1-1'),
  '0-1': () => import('./api/quizQuestions-1-2'),
  '0-2': () => import('./api/quizQuestions-1-3'),
  '0-3': () => import('./api/quizQuestions-1-4'),
  '0-4': () => import('./api/quizQuestions-1-5'),
  '0-5': () => import('./api/quizQuestions-1-6'),
  
  // 第二章
  '1-0': () => import('./api/quizQuestions-2-1'),
  '1-1': () => import('./api/quizQuestions-2-2'),
  '1-2': () => import('./api/quizQuestions-2-3'),
  '1-3': () => import('./api/quizQuestions-2-4'),
  '1-4': () => import('./api/quizQuestions-2-5'),
  '1-5': () => import('./api/quizQuestions-2-6'),
  '1-6': () => import('./api/quizQuestions-2-7'),

  // 第三章
  '2-0': () => import('./api/quizQuestions-3-1'),
  '2-1': () => import('./api/quizQuestions-3-2'),
  '2-2': () => import('./api/quizQuestions-3-3'),
  '2-3': () => import('./api/quizQuestions-3-4'),

  // 第四章
  '3-0': () => import('./api/quizQuestions-4-1'),
  '3-1': () => import('./api/quizQuestions-4-2'),
  '3-2': () => import('./api/quizQuestions-4-3'),

  // 第五章
  '4-0': () => import('./api/quizQuestions-5-1'),
  '4-1': () => import('./api/quizQuestions-5-2'),
  '4-2': () => import('./api/quizQuestions-5-3'),
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: 0,
      section: 0,
      quizQuestions: [],
      counter: 0,
      questionId: 0,
      question: '',
      answerOptions: [],
      answer: '',
      message: '',
      result: '',
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  componentDidMount() {
    document.getElementById("previousButton").style.display = "none";
    document.getElementById("nextButton").style.display = "none";
  }

  setProblemSet = async () => {
    const key = `${this.state.chapter}-${this.state.section}`;
    const module = await quizQuestionsMap[key]();
    const quizQuestions = this.shuffle(module.default);
    this.setState({
      quizQuestions: quizQuestions,
      question: quizQuestions[0].question,
      questionId: 1,
      answerOptions: quizQuestions[0].answers,
      nextButtonText: '下一題',
    });
    document.getElementById("previousButton").style.display = "none";
    document.getElementById("nextButton").style.display = "block";
  }

  handleChapterSelect = (chapterIndex) => {
    this.setState({ chapter: chapterIndex });
  };

  handleSectionSelect = (section) => {
    this.setState({ section: section });
  };

  handleProblemSet = (quizQuestions) =>{
    this.setState({quizQuestions: quizQuestions});
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (event.currentTarget.value === 'T') {
      this.setState({
        message: '正確'
      });
    } else {
      const filteredAnswers = this.state.answerOptions.filter(answer => answer.type === "T");
      const contentValues = filteredAnswers.map(answer => answer.content);
      this.setState({
        message: '錯誤，答案是 ' + contentValues
      });
    }
  }

  setUserAnswer(answer) {
    this.setState(() => ({
      answer: answer
    }));
  }

  setNextQuestion = () => {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    if (counter === this.state.quizQuestions.length) {
      this.setState({
        result: 'finished',
        message: '',
      });
      document.getElementById("previousButton").style.display = "none";
      document.getElementById("nextButton").style.display = "none";
    } else {
      this.setState({
        counter: counter,
        questionId: questionId,
        question: this.state.quizQuestions[counter].question,
        answerOptions: this.state.quizQuestions[counter].answers,
        answer: '',
        message: '',
      });
      document.getElementById("previousButton").style.display = "block";
      document.getElementById("nextButton").style.display = "block";
    }
  }

  setPreviousQuestion = () => {
    if (this.state.counter !== 0) {
      const counter = this.state.counter - 1;
      const questionId = this.state.questionId - 1;
      if (counter === 0) {
        this.setState({
          counter: counter,
          questionId: questionId,
          question: this.state.quizQuestions[counter].question,
          answerOptions: this.state.quizQuestions[counter].answers,
          answer: '',
          message: '',
        });
        document.getElementById("previousButton").style.display = "none";
        document.getElementById("nextButton").style.display = "block";
      } else {
        this.setState({
          counter: counter,
          questionId: questionId,
          question: this.state.quizQuestions[counter].question,
          answerOptions: this.state.quizQuestions[counter].answers,
          answer: '',
          message: '',
        });
        document.getElementById("previousButton").style.display = "block";
        document.getElementById("nextButton").style.display = "block";
      }
    }
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return <Result />;
  }

  renderSection() {
    return <Section onChapterSelect={this.handleChapterSelect} onSectionSelect={this.handleSectionSelect}/>;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>救生員題庫</h2>
          {this.renderSection()}
          <button type="button" className="button" id="confirmButton" onClick={this.setProblemSet}>確認</button>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
        <div className="message">{this.state.message}</div><br /><br />
        <div className="button-container">
          <button type="button" className="button" id="previousButton" onClick={this.setPreviousQuestion}>上一題</button>
          <button type="button" className="button" id="nextButton" onClick={this.setNextQuestion}>下一題</button>
        </div><br></br>
      </div>
    );
  }
}

export default App;
