/** @format */

import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

const initalState = {
  questions: [],
  status: "loading", // "loading", "error", "ready", "active", "finished"
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
    default:
      throw new Error("Action is unknown.");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initalState);

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
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
}
