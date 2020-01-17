---
title: Scroll infinito usando redux y redux-saga, Part III.
date: 2020-01-16T11:22:25.427Z
description: Part III Mejorando el código.
---

Más de estas series:
[Parte I](/infinite-scroll-with-redux-and-sagas-part-i/) ⋮
[Parte II](/infinite-scroll-with-redux-and-sagas-part-ii/)

LLevo ratos sin hacer un post, me quedé sin ideas y tenía ganas de postear algo, entonces este va ser el primer post del año y queria compartir, algunas mejoras que se vinieron a mi mente hace como tres días en esta app de scroll infinito que había hecho.

Como la aplicación estaba haciendo varios requests a **pokeAPI**(Me disculpo si alguien hizo el tutorial, por todas las llamadas en vano), entonces quise hacer este tutorial menos costoso, solo haciendo una llamada a **pokeAPI** y manejar la carga desde el frontend, sin hacer mas llamadas.

Entonces empecemos a hacer los cambios respectivos, primer con la parte de redux.

Inicialmente la aplicación llevaba la cuenta para hacer el fetch de mas pokemon en el lado de react, para esta iteración lo voy a pasar al store de redux, ¿por qué, se preguntaran?, la respuesta es esta, Si queremos tener un filtro para realizar mas operaciones como, buscar por nombre o ordenar por número y nombre, tiene sentido tener un estado adicional para guardar esos datos y filtrar acorde a eso, ya que se puede utilizar en cualquier parte de la aplicación, vamos a crear un modulo nuevo que se llama `filters.js` el cual va tener el estado de `count`.

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
Este es un reducer muy básico que va incrementar el estado si la acción `INCREMENT` se dispara. No te olvides de agregar este reducer al `rootReducer`.

En order de combinar el uso de estos dos estados `filter` y `pokemonList` vamos a utilizar selectores, un selector es una función que nos ayuda a computar datos que vienen del store de redux, por ejemplo en este caso vamos a recibir una respuesta del `pokeAPI` con todos los pokemon y vamos a filtrar esa lista, para decirle al componente que solo muestre un cierto limite, un selector es excelente para esto y ademas nos ayuda con la memorización.

Vamos a utilizar una libreria que se llama `reselect`, podemos utilizar nuestras propias funciones pero esta libreria nos ayuda a revisar si el estado cambia, para evitar re-renders innecesarios. Creemos el primer selector.

```js
// Selectores

// Primero declaramos la parte del estado que queremos utilizar.
const pokemonListSelector = state =>
  state.pokemonListReducer.pokemonList;
const filterSelector = state => state.filterReducer;

// Hacemos el filtro de datos aquí.
export const pokemonListFilterSelector = createSelector(
  [pokemonListSelector, filterSelector],
  (pokemonList, { count }) => {
    return pokemonList.filter(pokemon => pokemon.id <= count)
  },
);
```

En la función `pokemonListFilterSelector` estamos pasando los selectores que creamos antes, las funciones que contienen la parte del estado global que queremos utilizar, luego filtramos el `pokemonList` usando el valor de `count`. Usamos la función `createSelector`que nos la da **reselect**, acore a su documentación dice esto `Takes one or more selectors, or an array of selectors, computes their values and passes them as arguments to resultFunc`. Esto significa que basado en los selectores pasados, va retornar un valor nuevo con los resultados de esa función.

Bien ahora que tenemos el filtrado list, podriamos hacer un `dispatch` del `increment` **action creator** en nuestro componente y eso haria el truco, pero para hacer las cosas mas lindas y no perder la funcionalidad original, voy a crear dos acciones en el modulo `pokemonList`, para sacarle ventaja a las sagas.

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

Así es como se debería ver, la acción de **SUCCESS** va a transformar el arreglo recibido, creando uno nuevo con el atributo `id`, usando el método `getId` que esta en el repo. El resultado va a ser en vez de esto:

```js
{
  ...state,
  pokemonList: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  // rest of the list....
  ]
}
```

Esto:

```js
{
  ...state,
  pokemonList: [
    { id: 1, name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  // rest of the list....
  ]
}
```

Con ese cambio mínimo, estamonos ahorrando la llamada de `getId` en el componente de react, que cada vez que los props cambien se volvería a ejecutar, además de modificar la estructura a nuestro gusto, entonces el filtro va functionar porque ahora los objetos en el arreglo de `pokemonList` tienen un id.

Ahora necesitamos una saga que este observando nuestra acción `DISPLAY_MORE_BEGIN`, ya que esa es la que se va disparar en el frontend para incrementar el `count` en el `filterReducer`.

```js
/* Esta saga añade 0.4 segundos de delay, dispara el increment que actualiza el filterReducer count y termina el estado de loading en el pokemonReducer */
function* displayMorePokemonSaga() {
  yield delay(400);
  yield put(displayMorePokemonEnd());
  yield put(increment());
}

// No olvides de añadir la saga al watcher.
export function* pokemonListWatcherSaga() {
  yield takeLatest(FETCH_POKEMON_LIST, watchRequest);
  yield takeEvery(DISPLAY_MORE_BEGIN, displayMorePokemonSaga);
}
```

Ahora que tenemos eso, podemos empezar a actualizar el componente `PokemonList`.

Primero ocupamos modificar la función `mapStateToProps` para que quede así:

```jsx
// Yayyy aquí usamos la función para filtrar.
const mapStateToProps = state => ({
  isLoading: state.pokemonListReducer.isLoading,
  error: state.pokemonListReducer.error,
  pokemonList: pokemonListFilterSelector(state, state.filterReducer),
});
```

Podemos ir mas lejos y remover el componente de clase, ya que no necesitamos el estado del componente. Incluso podemos usar hooks para el fetch inicial. 😉

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

  // Nuestro hook para el fetch.
  useEffect(() => {
    fetchActionCreator();
  }, [fetchActionCreator]);

  const handleScroll = event => {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // dispatch el action creator DISPLAY_MORE_BEGIN.
      displayMore();
    }
  };
}
// Remover referencias de this
```

El código funcionara con estos cambios, pero no va cargar mas pokemon, aunque el spinner aparece, esto es algo facil de corregir, recuerden que nuestro endpoint pide solo 20 pokemon. entonces hacer el cambio ahí para que muestre todos va resolverlo.

```js
export const getPokemonList = () => {
  return API("get", `/pokemon/?offset=0&limit=807`);
};
```

Ahora si refrescas, vas a ver que el código esta funcionando, pero aún podemos hacer unas mejoras, por ejemplo tener una cuenta real de pokemon en el componente, vamos a crear un nuevo selector(uno muy sencillo).

```js
export const pokemonListCount = createSelector(
  [pokemonListSelector],
  (pokemonList) => pokemonList.length
);
```

Ahora cambiemos el código en el componente `PokemonList`.

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

Con ese pequeño selector nuestro scroll, ya no va mostrar el spinner si llegas al pokemon 809 (en el pokeAPI *la gen de sword y shield no esta aún*) y puedes mostrar el contador actual de pokemon que tienes en el arreglo filtrado. Espero que les haya gustado y [aquí](https://github.com/jean182/infinite-scroll) pueden encontrar el repo con el ejemplo completo.
