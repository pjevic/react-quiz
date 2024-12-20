/** @format */

import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { index, numQuestions, score, maxScore, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
      <p>
        Question: <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{score}</strong> / {maxScore}
      </p>
    </header>
  );
}

export default Progress;
