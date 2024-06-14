import React, { Component } from 'react';
import quizQuestionsOriginal from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import './App.css';
import quizQuestions from './api/quizQuestions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizQuestions: [],
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      message: '',
      result:'',

    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  componentDidMount() {
    const quizQuestions = this.shuffle(quizQuestionsOriginal);
    this.setState({
      quizQuestions: quizQuestions,
      question: quizQuestions[0].question,
      answerOptions: quizQuestions[0].answers,
      nextButtonText:'下一題'
    });
    document.getElementById("previousButton").style.display="none";
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if(event.currentTarget.value === 'T') {
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

    if(counter == this.state.quizQuestions.length){
      this.setState({
        result: 'finished',
        message: '',
      });
      document.getElementById("previousButton").style.display="none";
      document.getElementById("nextButton").style.display="none";
      this.render();
    }
    else{
      this.setState({
        counter: counter,
        questionId: questionId,
        question: this.state.quizQuestions[counter].question,
        answerOptions: this.state.quizQuestions[counter].answers,
        answer: '',
        message: '',
      });
      document.getElementById("previousButton").style.display="block";
      document.getElementById("nextButton").style.display="block";
    }


  }

  setPreviousQuestion = () => {
    if(this.state.counter != 0){
    
      const counter = this.state.counter - 1;
      const questionId = this.state.questionId - 1;
    if(counter == 0){
      
        this.setState({
          counter: counter,
          questionId: questionId,
          question: this.state.quizQuestions[counter].question,
          answerOptions: this.state.quizQuestions[counter].answers,
          answer: '',
          message: '',

      })
      document.getElementById("previousButton").style.display="none";
      document.getElementById("nextButton").style.display="block";
    }
      else{
        this.setState({
          counter: counter,
          questionId: questionId,
          question: this.state.quizQuestions[counter].question,
          answerOptions: this.state.quizQuestions[counter].answers,
          answer: '',
          message: '',
        });
        document.getElementById("previousButton").style.display="block";
        document.getElementById("nextButton").style.display="block";
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>救生員題庫</h2>
          <h3>第一章『救生安全知識』</h3>
          <h4>一、救生概論</h4>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
        <div className="message">{this.state.message}</div><br/><br/>
        <button type="button" className="button" id="previousButton" onClick={this.setPreviousQuestion}>上一題</button><br/><br/>
        <button type="button" className="button" id="nextButton" onClick={this.setNextQuestion}>下一題</button>
      </div>
    );
  }
}

export default App;
