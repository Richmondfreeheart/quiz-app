function ScoreSummary({ score, total, restartQuiz }) {
  return (
    <div>
      <h2>Quiz Finished!</h2>
      <p>
        Your Score: {score} / {total}
      </p>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
}

export default ScoreSummary;
