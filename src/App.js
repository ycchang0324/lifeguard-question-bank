import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import './App.css';




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: '',
      message: '',
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  //useless
  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
   // no shuffle
      /*
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
   
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      
    }
*/
    return array;
  }

 

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if(event.currentTarget.value=='T'){
        
        this.state.message='正確';

    }
    else{
      
      console.log(this.state.answerOptions);
        const filteredAnswers = this.state.answerOptions.filter(answer => answer.type === "T");

        // 使用 map 方法提取出 content 值
        const contentValues = filteredAnswers.map(answer => answer.content);
        this.state.message='錯誤，答案是 ' + contentValues;

    }
    
    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 3000);

    } else {
      setTimeout(() => this.setResults(this.getResults()), 3000);

    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: '',
      message:''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    var correctNum = 0;
    if (answersCount['F'] == this.state.counter+1) {
      correctNum=0;
    }
    else{
      correctNum=answersCount['T'];
    }

    return correctNum;
  }

  setResults(result) {
      this.setState({ result: result+1,
              message:''
      });
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return <Result totalNum={this.state.counter+1} correctNum={this.state.result-1} />;
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
        <div className="message">{this.state.message}</div>
      </div>
    );
  }
}

export default App;
