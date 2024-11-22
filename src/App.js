/** @format */

import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Progress from "./components/Progress";
import Question from "./components/Question";
import NextButton from "./components/NextButton";

const initalState = {
  questions: [],
  status: "loading", // "loading", "error", "ready", "active", "finished"
  index: 0,
  answer: null,
  score: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index++,
        answer: null,
      };

    default:
      throw new Error("Action is unknown.");
  }
}

export default function App() {
  const [{ questions, status, index, answer, score }, dispatch] = useReducer(
    reducer,
    initalState
  );

  const numQuestions = questions.length;
  const maxScore = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    const controller = new AbortController();

    async function fetchFromFakeAPI() {
      try {
        const res = await fetch("http://localhost:9000/questions", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Something is wrong witht the fake API");

        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          dispatch({ type: "dataFailed" });
        }
      }
    }
    fetchFromFakeAPI();

    return function () {
      controller.abort();
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              score={score}
              maxScore={maxScore}
              answer={answer}
            />
            <Question dispatch={dispatch} question={questions[index]} answer={answer} />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
