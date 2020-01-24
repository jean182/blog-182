---
title: Useful tips for testing redux in react with jest and enzyme.
date: 2020-01-23T11:22:25.427Z
description: Common patterns I had found when testing react with redux.
---

Hi guys in this post I would like to share some useful tips I have found when testing. Having the opportunity of being working in a real project with react has taught me a thing or two. Patterns I found quite useful, I also managed to create a way to test redux as well, and how to separate concerns, when testing `react-redux`.

This examples are using jest as the test suite and enzyme as the testing utility.

## Testing wrapped components.

First let start with the simplest, when you're using react with other libraries, you may have come across with wrapper functions. A wrapper function is a `HOC` that as it name suggest it **wraps** your component to provide extra functionality. `react-redux` has the `connect` and react router has the `withRouter` function. If your project leverages the use of any of those libraries you have probably used them. Testing those functions is very easy because what they do is provide additional props to your existing component.

When I was starting writing tests for a connected Redux component, I remember seeing this failure whenever I tried to write tests for connected components:

```
Invariant Violation:
Could not find "store" in the context of "Connect(ComponentName)".
Either wrap the root component in a <Provider>
or pass a custom React context provider to <Provider> and the corresponding
React context consumer to Connect(ComponentName) in connect options.
```

This is because our test suite unlike our application, is not wrapped in a `<Provider />` component, so it is not aware of the store context. To solve it without using a third party library. we can do the following; Take this component as an example:

```jsx{4}
import React from "react";
import { connect } from "react-redux";

export const Counter = ({ counter }) => {
  return (
    <p>
      {counter}
    </p>
  )
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(mapStateToProps)(Counter);
```

This is a really simple component that is connected to the redux store, in order to use a counter value. To be able to test it we need to create a [named export](https://redux.js.org/recipes/writing-tests/#connected-components) of the component and test it instead of testing the default one that is wrapped with connect. Our test would look something like this:

```js{5,9-11}
import React from "react";
import { shallow } from "enzyme";

// Notice the non default export here
import { Counter } from "./Counter";

let component;

const mockProps = {
  counter: 0
};

describe("Counter Component", () => {
  beforeAll(() => {
    component = shallow(<Counter {...mockProps} />);
  });

  it("displays the counter value", () => {
    expect(component.find("p").text()).toBe("0");
  });
});
```

 What the connect function does, is that pass the store state to the component as props, in order to test the component we just need to mock the store state, and inject it as we do with regular props.

 Same with dispatching actions, they are just part of the props, so in this example if we want to dispatch a certain action we have to do something like this:

```jsx{13, 16,22-31}
// Rest of the imports
import { bindActionCreators } from "redux";
import {
  incrementAction,
  decrementAction
} from "redux-modules/counter/counter";

export const Counter = (props) => {
  const { counter, increment, decrement } = props;
  return (
    <div>
      <p>{counter}</p>
      <button id="increment" type="button" onClick={() => increment()}>
        Increment
      </button>
      <button id="decrement" type="button" onClick={() => decrement()}>
        Decrement
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      increment: incrementAction,
      decrement: decrementAction
    },
    dispatch
  );
};

// Rest of the code

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
```

For those who don't know `bindActionCreators` is an utility that let us dispatch the action creator by just calling the function, without having to use the dispatch function. Is just a personal preference I like to use, so in the tests I can mock the increment function like this.

```js{11,23-27}
import React from "react";
import { shallow } from "enzyme";

// Notice the non default export here
import { Counter } from "./Counter";

let component;

const mockProps = {
  counter: 1,
  increment: jest.fn(() => 1),
  decrement: jest.fn(() => -1)
};

describe("Counter Component", () => {
  beforeAll(() => {
    component = shallow(<Counter {...mockProps} />);
  });

  it("displays the counter value", () => {
    expect(component.find("p").text()).toBe("0");
  });

  it("triggers the increment function", () => {
    component.find("#increment").simulate("click");
    expect(mockProps.increment.mock.results[0].value).toBe(1);
  });
});
```

If you see the highlights I'm mocking the function increment using `jest.fn(() => 1)` and it should return `1`, since the component is calling that function on an `onClick` event of a button, I'm searching the right button by using its id and I'm simulating the click event; If a click happens on the real component, the **increment function** will be triggered and the action will be dispatched, in this case if a clicks happens I should be seeing my **mock increment function** being triggered as well, but it should return `1` instead of dispatching because that's what I wanted to return in the test.

As you can see, here we test that a function is being **called**, we don't test what the function does. **You don't need to test that the counter increments, because that is not a responsibility of the component, it's a responsibility from the redux action**.

`Note: If you're using other libraries that use wrappers like withRouter from react router, you could do the named import and create an export that is not using a wrapper.`

## Testing the reducer:

To test the reducer I use a similar approach as the one that the redux [docs](https://redux.js.org/recipes/writing-tests/#reducers) use, what you're doing is to test the reducer function, this function receives an state(which is the object containing the actual state) and an action(which is also an object) that it always has a type and sometimes it could have a payload.

Take this reducer from the same counter example.

```js{4-19}
const initialState = { counter: 0 };

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}
```

This reducer is the one used to increment or decrement an initial counter set to `0`. To test it we are going to prove that the cases asserts the expected return values, for example if the reducer receives an action with type `INCREMENT`, it should increase the counter of the current state by `1`. so we do a test like this one:

```js{8-20}
const initialState = {
  counter: 0
};

describe("reducers", () => {
  describe("counter", () => {
    let updatedState = {};

    it("handles INCREMENT action", () => {
      updatedState = {
        counter: 1
      };
      expect(
        counterReducer(
          { ...initialState },
          { type: "INCREMENT" }
        )
      ).toEqual(updatedState);
    });
  });
});
```

PD: If you are wondering what the heck are `incrementAction` and `decrementAction` in the `Counter.js` file above , it is just this:

```js
export function incrementAction() {
  return { type: INCREMENT };
}
```

**A function that returns an action**. Is useful to avoid having to write the entire action object everytime you want to dispatch.

As you can see we just use the reducer function and pass the arguments that it needs, to return a new state. We can pass a modified state like `{ counter: 3 }` and the action with type `DECREMENT`and guess what, the `updatedState` should be `{ counter: 2 }`. With payloads on the action it is pretty similar, you just have to keep in mind that when you  are sending a payload, you normally want to use that to perform additional computations or validations. so the `updatedState` is going be updated based on that payload.

I like to separate the redux boilerplate from the react testing because I think this approach is a good way to ensure that everything works, separating concerns is the way to go, since you don't need to test redux functionality in a component.

## Testing selectors

Selectors are function that takes the state coming from redux and performs computations from them to return a new value. Imagine I have an state that has an array of user objects like this `{ name: "John", age 35 }`, the array does not have an specific order, but is a requirement to show the list of users ordered by age. Selectors are useful to do that before the data is painted in the screen so if you have a selector like this one

```js{30-34}
const initialState = {
  users: [
    {
      name: "Bob",
      age: 27
    },
    {
      name: "Anne",
      age: 18
    },
    {
      name: "Paul",
      age: 15
    },
    {
      name: "Pam",
      age: 30
    },
  ]
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

// Selectors

export const usersByAgeSelector = state => {
  return state.userReducer.users.sort((a, b) => a.age - b.age);
}
```

Our test should be like this one:

```js
describe("selectors", () => {
  const state = {
    userReducer: {
      users: [
        // Unordered List
      ],
    }
  };
  const orderedUsers = [
    {
      name: "Paul",
      age: 15
    },
    {
      name: "Anne",
      age: 18
    },
    {
      name: "Bob",
      age: 27
    },
    {
      name: "Pam",
      age: 30
    },
  ];
  describe("#usersByAgeSelector", () => {
    it("sorts the users based on the age attribute", () => {
      expect(usersByAgeSelector(state)).toEqual(orderedUsers);
    });
  });
});
```

Same as the reducer, we're just testing a function that sorts a given array of objects based on their attributes, this is pure unit testing. Only thing you have to notice, is that you have to pass a state atructure, so keep that in consideration, your test will fail if your root reducer structure is not the same as the one you're passing in the selector.

That would be all for it, I'm missing side effects, but I think that should be for another post(I'm familiar testing `redux-saga`), but I hope you like this post, if you find this helpful, or you think you it can be improved, please let me know.

[Repo](https://github.com/jean182/react-redux-counter-testing-sample) with examples.
