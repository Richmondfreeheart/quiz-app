import { useState } from "react";

function QuestionCard({ question, handleAnswer }) {
  const [shuffledAnswers, setShuffledAnswers] = useState(
    [...question.incorrect_answers, question.correct_answer]
      .sort(() => Math.random() - 0.5)
  );

  return (
    <div>
      <h3 dangerouslySetInnerHTML={{ __html: question.question }} />

      {shuffledAnswers.map((answer, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(answer === question.correct_answer)}
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      ))}
    </div>
  );
}

export default QuestionCard;
