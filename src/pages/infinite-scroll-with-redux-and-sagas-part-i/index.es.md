---
title: Scroll infinito usando redux y redux-saga.
date: 2019-10-14T11:19:41.427Z
description: Parte I Configurando Redux.
---

Más de estas series:
[Parte II](/infinite-scroll-with-redux-and-sagas-part-ii/) ⋮
[Parte III](/infinite-scroll-with-redux-and-sagas-part-iii/)

Ultimamente he estado tratando de crear una pokedex, utilizando redux, para practicar los conceptos básicos y tratando nuevas cosas desde una perspectiva del UI.

Aunque voy a crear una versión mas simple del dex que estoy construyendo actualmente, van a conocer cual es el metodo que utilizo para traer un gran arreglo de datos, por ejemplo los **700** y algo de pokemon disponibles. Empezemos.

Vamos a crear una app de react utilizando `react-create-app`, cuando todo este listo vamos a agregar las dependencias.

```bash
yarn add redux react-redux redux-logger redux-saga
```

Después vamos a a empezar a configurar redux, como siempre, vamos a crear un reducer para la lista de pokemon, después vamos a configurar el `store`  envolver la aplicación en el component `Provider`.

```bash
mkdir src/redux & mkdir src/redux/modules
touch src/redux/modules/pokemonList.js
```

Vamos a crear las acciones y el estado inicial.

```js
// Actions types
const FETCH_POKEMON_LIST = "pokemon-frontend/pokemon/FETCH_POKEMON_LIST";
const FETCH_POKEMON_LIST_SUCCESS =
  "pokemon-frontend/pokemon/FETCH_POKEMON_LIST_SUCCESS";
const FETCH_POKEMON_LIST_FAILURE =
  "pokemon-frontend/pokemon/FETCH_POKEMON_LIST_FAILURE";
const LOAD_MORE_POKEMON = "pokemon-frontend/pokemon/LOAD_MORE_POKEMON";
const LOAD_MORE_POKEMON_SUCCEED =
  "pokemon-frontend/pokemon/LOAD_MORE_POKEMON_SUCCEED";
const LOAD_MORE_POKEMON_FAILED =
  "pokemon-frontend/pokemon/LOAD_MORE_POKEMON_FAILED";

const initialState = { pokemonList: [], isLoading: false, error: "" };
```

Definimos 6 acciones, tres de estas son para el request inicial, el resto es para realizar nuevos request, siempre que el scroll llegue al final del contenido. El estado inicial deberia ser un arreglo vacio `[]` con un `booleano` para manejar el estado de carga del request y un `string` de error por si sucede alguna excepción.

Despues de eso necesitamos escribir el reducer, que se va a encargar de realizar cambios en el estado cuando una acción se ejecuta.

```js
// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_POKEMON_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_POKEMON_LIST_SUCCESS:
      return {
        ...state,
        pokemonList: action.payload.data.results,
        isLoading: false,
      };
    case FETCH_POKEMON_LIST_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case LOAD_MORE_POKEMON:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_MORE_POKEMON_SUCCEED:
      const newPokemonList = action.payload.data.results;
      const { pokemonList } = state;
      return {
        ...state,
        pokemonList: [...pokemonList, ...newPokemonList],
        isLoading: false,
      };
    case LOAD_MORE_POKEMON_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
```

Si estas leyendo esto, deberias tener familiaridad con redux, lo mas importante son las acciones que terminan en succeed. PokeAPI retorna un resultado como este:
![Poke API json response](./poke-api-result.png)

Como puedes ver el `data.results` nos va dar el resultado de la lista de pokemon y esta paginado, eso es perfecto para nuestra funcionalidad, porque siempre que vamos al final del scroll, vamos a pedir la página siguiente.

Algo mas para mencionar, es si la acción `LOAD_MORE_POKEMON` es exitosa, vamos a tener que añadir los elementos recibidos al arreglo actual, utilizamos el **spread operator** para eso.

Luego tenemos que definir **action creators** para las acciones que acabamos de crear:

```js
// Action Creators
export function loadPokemonList() {
  return { type: FETCH_POKEMON_LIST };
}

export function loadPokemonListSucceed(payload) {
  return { type: FETCH_POKEMON_LIST_SUCCESS, payload };
}

export function loadPokemonListFailed(payload) {
  return { type: FETCH_POKEMON_LIST_FAILURE, payload };
}

export function loadMorePokemon(payload) {
  return { type: LOAD_MORE_POKEMON, payload };
}

export function loadMorePokemonSucceed(payload) {
  return { type: LOAD_MORE_POKEMON_SUCCEED, payload };
}

export function loadMorePokemonFailed(payload) {
  return { type: LOAD_MORE_POKEMON_FAILED, payload };
}
```

La mayoria de nuestros **action creators** reciben un `payload`, solo el `loadPokemonList` no necesita un payload porque el request no necesita ningun argumento adicional para ser activado.

Por último, si bien no menos importante vamos a añadir las sagas, necesitamos una saga para cada request, y una principal que va estar observando cuando una acción sea ejecutada.

```js
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";

export function* fetchPokemonListSaga() {
  try {
    const response = yield call(getPokemonList);
    yield put(loadPokemonListSucceed(response));
  } catch (error) {
    yield put(loadPokemonListFailed(error.message));
  }
}

export function* loadMorePokemonListSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(loadMorePokemonList, payload);
    yield delay(1000);
    yield put(loadMorePokemonSucceed(response));
  } catch (error) {
    yield put(loadMorePokemonFailed(error.message));
  }
}

export function* pokemonListWatcherSaga() {
  yield takeLatest(FETCH_POKEMON_LIST, fetchPokemonListSaga);
  yield takeEvery(LOAD_MORE_POKEMON, loadMorePokemonListSaga);
}
```

Redux saga es una libreria bastante buena que se utiliza para manejar efectos secundarios, basicamente aquí utilizamos un efecto(así llama los llama la libreria) llamado `call` que ejecuta una promesa, que en este caso es el request al endpoint(los vamos a definir después), todo se encierra dentro de un `try catch`, porque la promesa ya sea que va retornar el response que queremos o puede retornar algun error; utilizando  el efecto `put` el cual puede ejecutar una acción; lo que es mejor es que inclusive tienen un efecto llamado `delay` que demora el tiempo pasado como parametro, en este caso un segundo, así vamos a tener tiempo para decirle al usuario que algo esta pasando.

La ultima saga es una que va estar observando cuando una accíon sea ejecutada y va ejecutar la saga asociada a esa acción, `takeLatest` solo toma la ultima saga y cancela todas las del **mismo tipo** que estaban ejecutandose antes, mientras `takeEvery` corre todas las sagas asociadas que se disparen, sin cancelar ninguna. Este es el comportamiento esperado, porque si hacemos scrolling muy rápido, no queremos que ninguno de nuestros requests se vayan a cancelar, ya que ocupamos mostrar todos los pokemon.

Con esto en mente, vamos a configurar el `mainReducer` y el `mainSaga`

```bash
touch src/redux/mainSaga.js &  touch src/redux/mainReducer.js
```

Vamos a editar el archivo `rootSaga`

```js
// rootSaga.js
import { all } from "redux-saga/effects";
import { pokemonListWatcherSaga } from "./modules/pokemonList";

export default function* rootSaga() {
  yield all([
    pokemonListWatcherSaga(),
  ]);
}
```

Y luego vamos a editar el archivo `rootReducer`

```js
// rootReducer
import { combineReducers } from "redux";
import pokemonListReducer from "./modules/pokemonList";

const rootReducer = combineReducers({
  pokemonListReducer,
});

export default rootReducer;
```

Por último, pero no menos importante al menos para la parte redux, configuraremos el store:

```bash
touch src/redux/configureStore.js
```

Y luego vamos a editar el archivo.

```js
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

export default function configureStore(initialState = {}) {
  const middlewares = [];

  if (process.env.NODE_ENV === "development") {
    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);
  }
  const sagaMiddleware = createSagaMiddleware();

  middlewares.push(sagaMiddleware);

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
```

Aquí solo importamos nuestro `mainReducer` y añadimos el middleware extra (redux-saga y redux-logger).

Ahora necesitamos crear nuestro endpoint, personalmente me gusta usar este setup:

```bash
yarn add axios humps
mkdir src/api
touch src/api/axiosInstance.js & touch src/api/pokemonEndpoints.js
```

El archivo `axiosInstance.js` va ser nuestra instancia por defecto de axios con nuestra configuración custom:

```js
import axios from "axios";
import humps from "humps";

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data),
  ],
  transformRequest: [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest,
  ],
});

export default function api(method, url, data = {}, options = {}) {
  const httpMethod = method.toLowerCase();

  const hasData = ["post", "put", "patch"].indexOf(httpMethod) >= 0;
  const settings = hasData ? options : data;

  const request = hasData
    ? axiosInstance[httpMethod](url, data, settings)
    : axiosInstance[httpMethod](url, settings);

  return request;
}
```

Este helper es para decamelizar el response, porque pokeAPI no envia json con formato de camelCase. Ademas hay una función custom para pasar los argumentos si ocupamos hacer el request.

```js
import API from "./axiosInstance";

export const getPokemonList = () => {
  return API("get", `/pokemon/?offset=0&limit=20`);
};

export const loadMorePokemonList = limit => {
  return API("get", `/pokemon/?offset=${limit}&limit=20`);
};
```

Estos dos endpoints son practicamente iguales, solo que `loadMorePokemonList` acepta un argumento que en este caso contiene la cantidad de pokemon que queremos cargar, lo vamos a incrementar por 20. No olviden añadir este export al module de redux `pokemonList`.

Esto va ser todo por este tutorial, espero que lo hayan disfrutado y por favor mantenganse atentos para la segunda parte, que va estar enfocada en la creación de componentes.
