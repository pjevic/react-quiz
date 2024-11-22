/** @format */

function FinishScreen({ score, maxScore, highsocre, dispatch }) {
  const percentage = Math.ceil((score / maxScore) * 100);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage > 0 && percentage < 50) emoji = "🏅";
  if (percentage === 0) emoji = "🎖️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{score}</strong> out of {maxScore} (
        {percentage}%)
      </p>
      <p className="highscore">Highscore: {highsocre} points</p>

      <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
