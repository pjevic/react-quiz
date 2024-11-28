/** @format */

import { createContext, useReducer, useEffect, useContext } from "react";

const QuizContext = createContext();

const SEC_PER_QUESTIONS = 30;

const initalState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  highsocre: 0,
  seconsRemaining: null,
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
        seconsRemaining: state.questions.length * SEC_PER_QUESTIONS,
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
    case "finish":
      return {
        ...state,
        status: "finished",
        highsocre: state.score > state.highsocre ? state.score : state.highsocre,
      };
    case "restart":
      return {
        ...initalState,
        seconsRemaining: state.questions.length * SEC_PER_QUESTIONS,
        questions: state.questions,
        highsocre: state.highsocre,
        status: "active",
      };
    case "tick":
      return {
        ...state,
        seconsRemaining: state.seconsRemaining--,
        status: state.seconsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action is unknown.");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, score, highsocre, seconsRemaining },
    dispatch,
  ] = useReducer(reducer, initalState);

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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        score,
        highsocre,
        numQuestions,
        maxScore,
        seconsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("QuizContext was outside QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
