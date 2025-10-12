import { useState } from "react";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import ScoreSummary from "./components/ScoreSummary";

function App() {
  const [quizState, setQuizState] = useState("start"); // start | playing | end
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = (fetchedQuestions) => {
    setQuestions(fetchedQuestions);
    setQuizState("playing");
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizState("end");
    }
  };

  const restartQuiz = () => {
    setQuizState("start");
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <div>
      {quizState === "start" && <QuizStart startQuiz={startQuiz} />}
      {quizState === "playing" && (
        <QuestionCard
          question={questions[currentQuestion]}
          handleAnswer={handleAnswer}
        />
      )}
      {quizState === "end" && (
        <ScoreSummary score={score} total={questions.length} restartQuiz={restartQuiz} />
      )}
    </div>
  );
}

export default App;
