<!-- @format -->

# React Quiz

## Overview

This repository documents advanced React concepts I learned from my favorite teacher, Jones Schmedtmann. Below are notes and examples from a React Quiz project.

## Table of Contents

1. [Managing State With useReducer](#managing-state-with-usereducer)
2. [Tips & Tricks](#tips--tricks)

---

## Managing State With useReducer

### When to Use `useReducer`?

`useReducer` is ideal for:

- Managing complex state logic spread across multiple handlers.
- Handling multiple state updates triggered by a single event.
- Updating state when dependent on other state values.

---

### Key Concepts

- **Initial State**: Define all state variables in one object.
- **Reducer Function**: Encapsulates state logic and actions.
- **Actions**: Descriptive objects that dictate state updates.
- **Dispatch**: Triggers updates by sending actions to the reducer.

---

### Example: Date Counter with `useReducer`

#### Initial State & Reducer Function

```jsx
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}
```

## Tips & Tricks

### ⚡ Using `Number()` to Convert Values

In JavaScript, the `Number()` function can be used to convert values to numbers. This is especially helpful when you need to perform arithmetic operations with boolean values. Here's a quick example showing how you can use it in a React component:

```javascript
<progress max={numQuestions} value={index + Number(answer !== null)}></progress>
```

## Credits

This project uses a CSS loader from the [100 CSS Loaders](https://dev.to/afif/i-made-100-css-loaders-for-your-next-project-4eje) collection by [Afif](https://dev.to/afif).

Explore their other amazing work for more creative loader options!
