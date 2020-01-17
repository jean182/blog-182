---
title: Infinite scrolling using redux and sagas, Part III.
date: 2020-01-16T11:22:25.427Z
description: Part III Improving the code.
---

More on this series:
[Part I](/infinite-scroll-with-redux-and-sagas-part-i/) ⋮
[Part II](/infinite-scroll-with-redux-and-sagas-part-ii/)

I have not posted in a long time, I've run out of ideas and I wanted to post something, this would be the the first post of the year and I want to share some improvements that came to my mind like three days ago in the infinite scrolling app I did.

As it was the application was performing several request to the  pokeAPI(I'm sorry if anyone did this tutorial because of all the wasted calls), so I wanted to make this less expensive, by just doing one call to the pokeAPI, and handle the loading with the FE without making more calls.

So let's start, to make the respective changes, first start with the redux part.

Initially the app kept the counter for fetching more pokemon on the react side, here I'm going to pass that to the redux store, but why you'll be wondering? The answer is this one, I want to have a filter that can have more functionality, like searching by text, or sorting by name and as the pokemon list is coming from redux, it makes sense to store it there, since we will have the ability to use it anywhere. I'm going to create a new module called `filters.js` and that will have the count state.

```js
const INCREMENT = "pokemon-frontend/filters/INCREMENT";

const filtersReducerDefaultState = {
  count: 20,
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 20,
      };
    default:
      return state;
  }
};

// Action Creators

export const increment = () => ({
  type: INCREMENT,
});
```

This is a pretty basic reducer that will increment the count is the action `INCREMENT` is dispatched. Don't forget! to add this to the `rootReducer`.

In order to wrap this `filter` state with the `pokemonList` state we will use selectors for this purpose, a selector is a function that help use to compute data from the redux state, for example in this case we will get a response with all the pokemon, and we're going to filter that list, and told the redux state, to just display a certain limit of pokemon from that list, so a selector makes a great use case for this, plus they can help us with memoization.

We will use a library called `reselect`, you can do this by your own but this library helps you to check wether the state has changed or not. Lets create our first selector:

```js
// Selectors

// First we declare part of the state that we want to make adjustments to
const pokemonListSelector = state =>
  state.pokemonListReducer.pokemonList;
const filterSelector = state => state.filterReducer;

// We perform the filtering here.
export const pokemonListFilterSelector = createSelector(
  [pokemonListSelector, filterSelector],
  (pokemonList, { count }) => {
    return pokemonList.filter(pokemon => pokemon.id <= count)
  },
);
```
Notice that on the `pokemonListFilterSelector` function we're passing in the selectors we created before, the functions containing our state, and then filter the `pokemonList` by using the `count` value. We use the `createSelector` function provided by **reselect** that according to the docs `Takes one or more selectors, or an array of selectors, computes their values and passes them as arguments to resultFunc`. That means that based on the selectors that we passed it will return a new value with the results of the given function.

Cool now we have the filtering done, now we need could either dispatch the `increment` action creator that we've just created in the component and that will do the trick, but to make this nicer I'm going to create two actions on the `pokemonList` duck to take advantage of the sagas.

```js
// New Actions
const DISPLAY_MORE_BEGIN = "pokemon-frontend/pokemon/DISPLAY_MORE_BEGIN";
const DISPLAY_MORE_END = "pokemon-frontend/pokemon/DISPLAY_MORE_END";

// Reducer (only contain the relevant cases for this example.)
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_POKEMON_LIST_SUCCESS:
      const { results } = action.payload.data;
      const pokemonResultsList = results.map(pokemon => {
        const id = parseInt(getId(pokemon.url), 10);
        return { id, ...pokemon };
      });
      return {
        ...state,
        pokemonList: pokemonResultsList,
        isLoading: false,
      };
    case DISPLAY_MORE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case DISPLAY_MORE_END:
      return {
        ...state,
        isLoading: false,
      };
  }
}

// New action creators
export function displayMorePokemon() {
  return { type: DISPLAY_MORE_BEGIN };
}

export function displayMorePokemonEnd() {
  return { type: DISPLAY_MORE_END };
}

```

Now this is how it should look, the **SUCCESS** action is going to transform the received array to a new one, that will have a new attribute `id` with the pokemon number, using the method `getId` that is on the repo. so the result will be instead of this:

```js
{
  ...state,
  pokemonList: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  // rest of the list....
  ]
}
```

like this:

```js
{
  ...state,
  pokemonList: [
    { id: 1, name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  // rest of the list....
  ]
}
```
With that minimal change we're saving the call on the react component and we have modified the structure to our taste so the filter will work, since the `pokemonList` objects have an id.

Now we need a saga to watch our action `DISPLAY_MORE_BEGIN` because that one is the one that will trigger in the frontend to start incrementing the `filterReducer` count.

```js
/* This saga adds a 0.4 second delay, triggers the increment that updates the filterReducer count and finish the loading state on the pokemonList reducer */
function* displayMorePokemonSaga() {
  yield delay(400);
  yield put(displayMorePokemonEnd());
  yield put(increment());
}

// Don't forget to add the watcher saga
export function* pokemonListWatcherSaga() {
  yield takeLatest(FETCH_POKEMON_LIST, watchRequest);
  yield takeEvery(DISPLAY_MORE_BEGIN, displayMorePokemonSaga);
}
```

Now that we have that we can start updating the `PokemonList` component:

First we need to update our `mapStateToProps` function to this one:

```jsx
// Yayyy here we use the function to filter.
const mapStateToProps = state => ({
  isLoading: state.pokemonListReducer.isLoading,
  error: state.pokemonListReducer.error,
  pokemonList: pokemonListFilterSelector(state, state.filterReducer),
});
```

We can even go further and remove the class component, because we're no longer relying in the state of the component. We could even use hooks to do the initial fetch. 😉

```jsx
import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadPokemonList, displayMorePokemon, pokemonListFilterSelector } from "../redux/modules/pokemonList";
import ListItemLoader from "./ListItemLoader";
import PokemonListItem from "./PokemonListItem";
import { getId } from "../helpers/pokemonUtils";

const PokemonList = props => {
  const {
    fetchActionCreator,
    displayMore,
    isLoading,
    error,
    pokemonList,
  } = props;

  // Our cool fetching hook.
  useEffect(() => {
    fetchActionCreator();
  }, [fetchActionCreator]);

  const handleScroll = event => {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // dispatch the DISPLAY_MORE_BEGIN action creator.
      displayMore();
    }
  };
}
```

With this you'll notice that the code is working but it does not load the pokemon even though the spinner appears, well this is an easy one because remember that our endpoint is just asking for the first 20 pokemon, so making the change to query all of them will do the trick.

```js
export const getPokemonList = () => {
  return API("get", `/pokemon/?offset=0&limit=807`);
};
```

Now if you refresh, you can see that the code is now working, but we can perform a few improvements along the way, like having a real pokemon count instead of putting  the number. so we'll do another selector(a pretty easy one).

```js
export const pokemonListCount = createSelector(
  [pokemonListSelector],
  (pokemonList) => pokemonList.length
);
```

Now let's change our code a bit on the PokemonList component:

```jsx
// Add the selector to the props.
const mapStateToProps = state => ({
  // Rest of the props...
  totalPokemonCount: pokemonListCount(state),
});

// Change this jsx
<p className="text-muted ml-3">Displaying {pokemonList.length} pokemon of {totalPokemonCount}</p>

// Add this condition
  const handleScroll = event => {
    const element = event.target;
    if ((element.scrollHeight - element.scrollTop === element.clientHeight) && totalPokemonCount > pokemonList.length) {
      displayMore();
    }
  };
```

With that little selector now your scroll with not display the loading if you reach the 809 pokemon (on the pokeAPI *Sword-Shield gen is not there yet*) and you can show the actual count of pokemon that you have in your array. Hope you like this tutorial and you can find the repo with full examples [here](https://github.com/jean182/infinite-scroll).
