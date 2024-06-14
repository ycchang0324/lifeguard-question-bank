import React, { Component } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import Section from './components/Section';
import './App.css';

const chapters = ['第一章『救生安全知識』', '第二章『徒手救援知識』', '第三章『急救知識』', '第四章『救援器材知識』','第五章『船艇救援知識』'];
const sections =  [
  ["救生概論", "水域安全", "仰漂", "踩水", "抽筋自解", "水域標誌"],
  ["速度游", "救生四式", "拖帶假人", "蛙鞋", "潛水", "潛泳", "綜合（入水、接近、防衛躲避、解脫、帶人、起岸…等）"],
  ["CPR&AED(單雙人)", "脊椎損傷(水中救援)", "異物哽塞(含復甦姿勢)", "其他 評估 、 休克 、 止血 、 體循環 、 失溫 、 燙傷 、 骨折 、 冰敷 …等"],
  ["拋繩救生", "長背板", "救生浮標"],
  ["機動船艇", "充氣式船艇", "一般船艇(七人式、橡皮艇)"]
];

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
      checkedId: '',
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
      result: 'begin',
    });
    document.getElementById("previousButton").style.display = "none";
    document.getElementById("nextButton").style.display = "block";
    document.getElementById("confirmButton").style.display = "none";
  }

  handleChapterSelect = (chapterIndex) => {
    this.setState({ chapter: chapterIndex });
  };

  handleSectionSelect = (section) => {
    this.setState({ section: section });
  };

  handleProblemSet = (quizQuestions) => {
    this.setState({ quizQuestions: quizQuestions });
  }

  handleAnswerSelected(event, id) {
    this.setUserAnswer(event.currentTarget.value);
    this.setUserContent(event.currentTarget.getAttribute('content'));
    this.setState({ checkedId: id }); // 更新選中的 id
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

  setUserContent(content) {
    this.setState({
      content: content
    });
  }

  setUserAnswer(answer) {
    this.setState({
      answer: answer
    });
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
        content: '',
        checkedId: '', // 重置選中的 id
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
          content: '',
          checkedId: '', // 重置選中的 id
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
          checkedId: '', // 重置選中的 id
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
        content={this.state.content}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.quizQuestions.length}
        checkedId={this.state.checkedId} // 傳遞選中的 id
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return <Result />;
  }

  renderSection() {
    return <Section onChapterSelect={this.handleChapterSelect} onSectionSelect={this.handleSectionSelect} />;
  }

  renderConfirmSection() {
    return (
      <div>
        {chapters[this.state.chapter]}<br />
        {sections[this.state.chapter][this.state.section]}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>救生員題庫</h2>
          {this.state.result !== '' ? this.renderConfirmSection() : this.renderSection()}
          <button type="button" className="button" id="confirmButton" onClick={this.setProblemSet}>確認</button>
        </div>
        {this.state.result === 'finished' ? this.renderResult() : this.renderQuiz()}
        <div className="message">{this.state.message}</div><br /><br />
        <div className="button-container">
          <button type="button" className="button" id="previousButton" onClick={this.setPreviousQuestion}>上一題</button>
          <button type="button" className="button" id="nextButton" onClick={this.setNextQuestion}>下一題</button>
        </div><br />
      </div>
    );
  }
}

export default App;
