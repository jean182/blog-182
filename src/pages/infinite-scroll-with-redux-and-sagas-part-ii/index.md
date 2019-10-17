---
title: Infinite scrolling using redux and sagas, Part II.
date: 2019-10-16T11:22:25.427Z
description: Part II Setting up the frontend.
---

More on this series:
[Part I](/infinite-scroll-with-redux-and-sagas-part-i/)

For this part we'll be focusing on the component setup, and the srolling part and fetching data when the scroll is at the bottom.

Our component structure will be the following:

* Provider (React-redux wrapper.)
  * PokemonList (Component with scrolling logic and api calls)
      * PokemonListItem (Stateless component just for displaying the pokemon)

We will add the following dependencies as well, one is for having a content loader for the first time load, second it bootstrap for its awesome grid system, lodash is for the ease of validating if the redux array is empty and node sass to have the bootstrap core import in our scss file.

```bash
yarn add react-content-loader bootstrap lodash node-sass
```

We will rename our `app.css` to `app.scss` and we will add this import at the beginning, now with this require we will be able to use the bootstrap grid and core components.

```scss
@import "~bootstrap/scss/bootstrap";
```

When we have this ready lets create a new file for the PokemonList component

```bash
touch src/components/PokemonList
```

First we'll start connecting redux with the component, the component will dispatch two redux actions creators `loadPokemonList` and `loadMorePokemon` also we will set an state for our component which is going to keep count of the pagination, to send the params to our endpoint

```jsx
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadPokemonList, loadMorePokemon } from "../redux/modules/pokemonList";

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: 20,
    };
  }
}

const mapStateToProps = state => ({
  isLoading: state.pokemonListReducer.isLoading,
  error: state.pokemonListReducer.error,
  pokemonList: state.pokemonListReducer.pokemonList,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchActionCreator: loadPokemonList,
      loadMoreActionCreator: loadMorePokemon,
    },
    dispatch,
  );
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonList);
```

Notice how we are adding the redux state, to handle all the use cases of our API, for example the loading and error attributes. Also we use bindActionCreators function to define the name of our action creators in the component, those will be available in the component props.

Now we are going to add the first fetch on the `componentDidMount` because we want to perform the fetch when our component mounts.

```jsx
  componentDidMount() {
    const { fetchActionCreator } = this.props;
    fetchActionCreator();
  }
```

As I mentioned, I rename the loadMorePokemon to `fetchActionCreator` and it is available in the props so we're just calling that function inside the `componentDidMount`. This will trigger all the redux flow that will either bring a success response, or return an error message.

So to handle the initial load, I'm going to create a new component that is going to use the library `react-content-loader` so the user we'll see a content loader on screen

```bash
touch src/components/ListItemLoader.js
```

Please check the docs if you have trouble reading this component

```jsx
import React from "react";
import ContentLoader from "react-content-loader";

const ListItemLoader = () => {
  return (
    <ContentLoader
      height={507}
      width={900}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="30" y="20" rx="0" ry="0" width="130" height="23" />
      <rect x="30" y="60" rx="0" ry="0" width="200" height="120" />
      <rect x="30" y="189" rx="0" ry="0" width="200" height="15" />
      <rect x="30" y="211" rx="0" ry="0" width="140" height="15" />
      <rect x="243" y="60" rx="0" ry="0" width="200" height="120" />
      <rect x="243" y="189" rx="0" ry="0" width="200" height="15" />
      <rect x="243" y="211" rx="0" ry="0" width="140" height="15" />
      <rect x="455" y="60" rx="0" ry="0" width="200" height="120" />
      <rect x="455" y="189" rx="0" ry="0" width="200" height="15" />
      <rect x="455" y="211" rx="0" ry="0" width="140" height="15" />
      <rect x="667" y="60" rx="0" ry="0" width="200" height="120" />
      <rect x="667" y="188" rx="0" ry="0" width="200" height="15" />
      <rect x="667" y="209" rx="0" ry="0" width="140" height="15" />
      <rect x="30" y="280" rx="0" ry="0" width="130" height="23" />
      <rect x="30" y="320" rx="0" ry="0" width="200" height="120" />
      <rect x="30" y="450" rx="0" ry="0" width="200" height="15" />
      <rect x="30" y="474" rx="0" ry="0" width="140" height="15" />
      <rect x="243" y="320" rx="0" ry="0" width="200" height="120" />
      <rect x="455" y="320" rx="0" ry="0" width="200" height="120" />
      <rect x="667" y="320" rx="0" ry="0" width="200" height="120" />
      <rect x="243" y="450" rx="0" ry="0" width="200" height="15" />
      <rect x="455" y="450" rx="0" ry="0" width="200" height="15" />
      <rect x="667" y="450" rx="0" ry="0" width="200" height="15" />
      <rect x="243" y="474" rx="0" ry="0" width="140" height="15" />
      <rect x="455" y="474" rx="0" ry="0" width="140" height="15" />
      <rect x="667" y="474" rx="0" ry="0" width="140" height="15" />
    </ContentLoader>
  );
};

export default ListItemLoader;
```

Now we will modify our `PokemonList` component to display this new component when we have do our initial load.

```jsx
  render() {
    const { isLoading, error, pokemonList } = this.props;
    if (_.isEmpty(pokemonList) && isLoading) return <ListItemLoader />;
    if (error) return <p>Error</p>;
    return (
      <div>
        {pokemonList.length}
      </div>
    )
  }
```

Here we're using the props from redux, notice that we are going to show the ListItemLoader just on the first load, when we implement the scrolling we will use something else, we also have an error if just in case something happens and we're just returning the array length if we get the correct response.

Now we'll modify the `App.js` component to add the Provider wrapper and our newly created component.

```jsx
import React from 'react';
import { Provider } from "react-redux"
import configureStore from "./redux/configureStore";
import './App.scss';
import PokemonList from './components/PokemonList';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <PokemonList />
      </div>
    </Provider>
  );
}

export default App;
```

Here we're just wrapping our code in the Provider and using the store function that we just created.

Now we should see something like this on the initial load and our count afterwards should be 20 because that's what we defined in the endpoint:

![React-content-loader](./react-content-loader.png)

Pretty cool right, now let's do the logic for our scrolling, this was taken from an example from this [post](https://www.kempsterrrr.xyz/handling-scroll-events-in-react/) a condition that checks if our scroll has reach the end of the container where it belongs.

```jsx
  handleScroll = event => {
    const { loadMoreActionCreator } = this.props;
    const { currentCount } = this.state;
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      loadMoreActionCreator(currentCount);
      this.setState({
        currentCount: currentCount + 20,
      });
    }
  };
```
If we are at the end the condition is met and we will trigger the `loadMoreActionCreator` that will request for more pokemon and we will increment the currenCount by 20, so if we go to the bottom of the container again we will fetch for more pokemon. now that we have everything, our render method should look like this.

```jsx
  render() {
    const { isLoading, error, pokemonList } = this.props;
    if (_.isEmpty(pokemonList) && isLoading) return <ListItemLoader />;
    if (error) return <p>Error</p>;
    return (
      <div className="border m-5">
        <div
          className="row"
          onScroll={this.handleScroll}
          style={{ height: "500px, overflow: "auto" }}
        >
          {pokemonList.map(pokemon => {
            const { url, name } = pokemon;
            const id = getId(url);
            return (
              <div key={pokemon.url} className="col-sm-3">
                <PokemonListItem id={id} name={name} />
              </div>
            );
          })}
        </div>
        {isLoading && (
          <div className="text-center">
            <div
              className="spinner-border"
              style={{ width: "4rem", height: "4rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <p className="text-muted ml-3">Displaying {pokemonList.length} pokemon of 807</p>
      </div>
    )
  }
```

There are a few thing happening, we created a main `div` that has two `div` one is the one that contains the `<PokemonListItem>`which we will add later and the other one is to display a loading icon if the loading changes, which is the expected behavior if we scroll to the bottom of the `div` since a new request will be triggered. get id is a helper that we will add as well. Lets do that `touch src/helpers/pokemonUtils.js`

```js
export const getId = url => {
  return url
    .split("/")
    .filter(el => !!el)
    .pop();
};
```

This just takes the url attribute from the response data and it returns the id that is associated to it. Now the `PokemonListItem` is a fairly easy component, it looks like this:

```jsx
import _ from "lodash";
import React from "react";

const PokemonListItem = ({ id, name }) => {
  return (
    <>
      <div>
        <img
          className="d-block mx-auto"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
        />
      </div>
      <div className="text-center">
        <p>{_.capitalize(name)}</p>
      </div>
    </>
  );
};

export default PokemonListItem;
```

That's why the getId  method comes in handy is important because we will show the pokemon image which is available in github.

If you follow everything step by step you should see something like this:

![Infinite Scroll](./infinite-scroll.gif)

So here it is, this is the way I figure out for fetching large datasets, 9gag uses a similar way to fetch its content and I think is a pretty awesome way to do it if you don't want to add a paginator. This is the [repo](https://github.com/jean182/infinite-scroll) if you want to see all the implementation.
