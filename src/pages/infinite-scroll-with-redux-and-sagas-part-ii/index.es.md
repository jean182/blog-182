---
title: Scroll infinito usando redux y redux-saga, Parte II.
date: 2019-10-16T11:22:25.427Z
description: Parte II Configurando el frontend.
---

Más de estas series:
[Parte I](/infinite-scroll-with-redux-and-sagas-part-i/) ⋮
[Parte III](/infinite-scroll-with-redux-and-sagas-part-iii/)

Para esta parte nos vamos a concentrar en la configuracion del component, el scrolling y hacer requests adicionales si el scroll llega al final.

La estructura de nuestros componentes va ser la siguiente:

* Provider (contenedor de React-redux.)
  * PokemonList (Componente con la lógica del scrolling y llamadas al api)
      * PokemonListItem (Componente sin estado para mostrar el pokemon)

Vamos a añadir las siguientes dependencias, una es para tener un content loader para la carga por primera vez, la segunda es `bootstrap`, que tiene un grid asombroso, lodash es para facilitar la validacion si el arreglo que viene de redux esta vacio o no y la ultima es `node-sass` que es para tener el import de bootstrap en nuestro archivo scss.

```bash
yarn add react-content-loader bootstrap lodash node-sass
```

Vamos a renombrar nuestro archivo `app.css` a `app.scss` y vamos a añadir esto al inicio del archivo, para poder utilizar el grid de bootstrap y sus componentes.

```scss
@import "~bootstrap/scss/bootstrap";
```

Cuando tengamos esto, creemos un nuevo archivo para el componente `PokemonList`

```bash
touch src/components/PokemonList.js
```

Vamos a empezar conectando nuestro componente con redux, el componente va hacer un dispatch, osea va ejecutar dos **action creators**(los creamos en el tutorial anterior) `loadPokemonList` y `loadMorePokemon`, ademas vamos a ponerle un estado a nuestro componente que va mantener la cuenta de la paginación, para poder enviarle parametros a nuestro endpoint.

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

Notaste que añadimos con el `mapStateToProps` el estado de redux, para poder manejar todos los casos de uso, como por ejemplo el estado de carga y error, también usamos la función `bindActionCreators` que nos permite poner otro nombre a nuestros action creators y permite utilizar ese nombre que definimos en nuestro componente, ya que van a estar en los props del mismo.

Ahora vamos a añadir el primer fetch en el metodo `componentDidMount` porque ahí es donde queremos que se ejecute el primer fetch, apenas monte el componente.

```jsx
  componentDidMount() {
    const { fetchActionCreator } = this.props;
    fetchActionCreator();
  }
```

Como mencione antes, renombramos el `loadMorePokemon` a `fetchActionCreator` y este va estar disponible en los props, entonces solo estamos llamando esa función dentro del `componentDidMount`. Esto va a hacer un *dispatch* de la acción y va ejecutar todo el flow de redux, que nos va retornar ya sea la lista de pokemon o un mensaje de error.

Entonces, para manejar el estado inicial, vamos a crear un componente nuevo que va usar la libreria `react-content-loader`, para que el usuario vea contenido cargando en la pantalla.

```bash
touch src/components/ListItemLoader.js
```

Por favor revisa la documentación de la libreria si tienes problemas leyendo esto.

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

Ahora vamos a modificar nuestro componente `PokemonList` para mostrar este nuevo componente, cuando hacemos la carga inicial.

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

Aquí solo utilizamos los props de redux, estamos mostrando el `ListItemLoader` solo en la carga inicial, cuando implementamos el scrolling, vamos a usar otra cosa, tambien tenemos una condición por si el error muestra algo, por ahora solo estamos mostrando la longitud del arreglo, para ver que la respuesta es correcta.

Ahora vamos a modificar el componente `App.js` para añadir el componente `Provider` y el componente que acabamos de crear.

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

Aquí solo metemos todo nuestro contenido dentro del `Provider` y usamos función que creamos en el tutorial pasado para pasarle el store a el `Provider`.

Ahora deberiamos ver algo como esto en nuestra carga inicial y nuestra cuenta deberia de ser 20, porque eso es lo que definimos en el endpoint.

![React-content-loader](./react-content-loader.png)

Bastante chiva verdad, ahora vamos a hacer la lógica para el scrolling, esto fue tomado de un ejemplo en este [post](https://www.kempsterrrr.xyz/handling-scroll-events-in-react/), es una condición que revisa si el scroll a llegado al final del contenedor al que pertenece.

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

Si hacemos scroll y llegamos al final, esa condición se va a cumplir y va a ejecutar el `loadMoreActionCreator` que va a hacer un request por mas pokemon y vamos a incrementar el `currentCount` + 20. Ahora que tenemos todo listo, nuestro método `render` deberia verse como esto.

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

Estan pasando varias cosas, primero creamos un `div` principal que contiene dos `div`, uno contiene el componente `<PokemonListItem>` que vamos a crear despues, y el otro es para mostrar un icono de carga, si el estado de loading cambia, el cual es un comportamiento esperado si llegamos al final del `div`, ya que un nuevo request va ser ejecutado. `getId` es un helper que vamos a añadir, creemos este archivo para eso `touch src/helpers/pokemonUtils.js`

```js
export const getId = url => {
  return url
    .split("/")
    .filter(el => !!el)
    .pop();
};
```

Esto solo toma el url que recibimos como parte del response y lo parsea para obtener el id que viene al final. Ahora `PokemonListItem` es un componente bastante fácil de hacer y se ve como esto:

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

Por eso el método de `getId` nos viene a ser util, porque ahora vamos a mostrar la imagen del pokemon, que se encuentra disponible en github.

Si seguiste todo paso a paso deberias ver algo como esto:

![Infinite Scroll](./infinite-scroll.gif)

Entonces, eso es todo, esta es la manera que se me ocurrio para hacer un fetch a una lista larga de objetos, 9gag utiliza una forma similar para mostrar su contenido y creo que es bastante bueno si no quieres utilizar un paginador. Este es el repo [repo](https://github.com/jean182/infinite-scroll) si quieres ver la implementación completa.
