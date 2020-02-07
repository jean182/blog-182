---
title: Tema oscuro, diferentes formas de implementarlo.
date: 2020-01-20T11:22:25.427Z
description: Un estudio de caso sobre cómo los sitios web implementan temas claros y oscuros.
---

Cuando estaba creando este blog, el primer feature que queria para él, era la habilidad de cambiar el tema a uno claro y uno oscuro. Recuerdo que los temas oscuros ya se utlizaban, incluso desde que yo estaba instalando ROMS personalizadas en mi galaxy s3 mini, que tenia android 4.1. Algunas de estas ROMS tenían la funcionalidad de cambiar el tema del sistema a uno oscuro , lo cual era bastante asombroso para el tiempo, considerando que hasta el año pasado, empezamos a ver la caracteristica en android stock y IOs -macOS.

Así que en este post, voy a hablar en como algunos sitios web implementan sus temas; La mayoria te permiten cambiar el tema por medio de un switch usando un toggle o un botón, algunos permiten persistir el tema, incluso si el navegador se cierra y algunos te permiten elegir el tema basado en las preferencias del sistema operativo.

## Google Fonts.

Primero, me gustaría hablar de la forma más fácil y directa de hacerlo, Voy a usar [Google Fonts](https://fonts.google.com/) como ejemplo.

Inspeccionando el stio, podemos observar que ellos tienen una clase en el tag de html llamada `t-white`, si presionamos el toggle para cambia el color del background y elegimos la opción oscura, vamos a notar que la clase especificada en el tag html va cambiar a usar una llamada `t-black`. El javascript de la pagina probablemente cambia el atributo del nodo a que utilice la clase contaria `t-class` que esta seleccionada actualmente y eso cambia el UI. Sí observamos el css (ocupamos usar una herramienta para formatear el archivo minified), podemos ver que , que ellos declaran las mismas clases para la clase `t-black` y `t-white`, pero con los valores opuestos para que el tema funcione.

```css
/* Some of the black classes */
.t-black,
.t-black body,
.t-black #main {
	background: #222;
	color: #fff;
	fill: #fff
}

.t-black .fonts-page.is-bordered,
.t-black .fonts-module {
	border-top-color: rgba(255, 255, 255, .4)
}

/* Some of the white classes */
.t-white .fonts-page.is-bordered,
.t-white .fonts-module {
	border-top-color: rgba(0, 0, 0, .4)
}

.t-white,
.t-white body,
.t-white #main,
.t-white .font-preview-headers,
.t-white .font-preview-controls {
	background: #fff;
	fill: #fff
}
```

Lo que me gusta de esta manera de hacerlo, es que tenemos un tema oscuro y uno claro, compatibles con cualquier browser, ya estan usando **css** en su estado mas puro, aún si el código es muy repetitivo, ya que las clases son practicamente iguales, nos asegura compatibilidad de navegadores(lo cual es algo valioso ya que los otros métodos no lo ofreccen). La página no persiste el tema seleccionado, el tema claro es el que se va mostrar por defecto siempre(aunque se podria persistir facilmente).

## Implementación de gatsby.

Gatsby es una libreria para desarollar sitios web estáticos(mi blog lo usa) y su [página](https://www.gatsbyjs.org/) es bastante buena. Si revisan su [repo](https://github.com/gatsbyjs/gatsby) van a darse cuenta que ellos utilizan una libreria que se llama `theme-ui` para manejar sus estilos, incluyendo el tema. Es bastante facil de usar y se necesita un objeto que va contener todos los atributos del tema, como los fonts, colores, tamaños. Nos permite aplicar un atributo a nuestro llamado [color modes](https://theme-ui.com/color-modes/) en el cual se puede especificar diferentes set de colores de acuerdo al tema que utilicemos, nosotros nombramos esos modos, por lo cual se pueden tener varios. Entonces en nuestro código podemos llamar un hook que se llama `useColorMode` que nos permite **cambiar o retornar** el *valor* del modo actual. Gatsby lo usa en su componente `DarkModeToggle`. Puedes ver la implementación [aquí](https://github.com/gatsbyjs/gatsby/blob/65a6833beee71e7a46bb44bcfdcc565438d8e6ff/www/src/components/dark-mode-toggle.js#L126).

Miren este ejemplo tomado de los docs de `theme-ui`:

```jsx
import React from 'react'
import { useColorMode } from 'theme-ui'
export default props => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <header>
      <button
        onClick={e => {
          setColorMode(colorMode === 'default' ? 'dark' : 'default')
        }}>
        Toggle {colorMode === 'default' ? 'Dark' : 'Light'}
      </button>
    </header>
  )
}
```

Este snippet usa el hook de `useColorMode` que es como el hook de `useState` con esteroides, porque hace todo el trabajo de cambiar el tema por nosotros. Revisen como esta implementado [aquí](https://github.com/system-ui/theme-ui/blob/90066c9786bc3acbb3eb49ee32386c57760625e8/packages/theme-ui/src/color-modes.js). Es algo fuera del post pero revisando el código es bastante inspirador ver la forma en que funciona y aporta muchas ideas.

Este método es el mas fácil de setear y va a hacer todo el trabajo sucio por tí, ya que puede persistir el tema seleccionado, guardando el valor en el `localStorage`, menos cosas que preocuparte significa que vas a trabajar mas feliz. Tambien ofrecen soporte para el `prefers-color-scheme`, el cual hablaremos despues. Una de las contras que encontre es que IE11 no tiene soporte para `prefers-color-scheme`, tampoco para las variables de CSS.

**Update: Si ofrecen la posibilidad de usar el tema sin variables de css y el prefers-colors-scheme puede ser descativado** ver esta [sección](https://theme-ui.com/color-modes#turn-off-custom-properties) de sus docs

## Loserkid

Ahora hablemos de mi [blog](https://loserkid.io/) :p, Yo escribi mi tema para este blog usando tutoriales que encontre en internet, que se enfocaban mayormente en usar **variables css** y me base mucho en el código de [overreacted.io](https://overreacted.io/) como inspiración para persistir el tema.

Mi tema y `theme-ui` usan variables css, estas son unas que contienen valores especificos definidos por nosotros que pueden ser reutilizados por toda nuestra hoja de estilos. Por ejemplo si quiero que un botón tenga un color distinto, dependiendo de la clase de html, puedo hacer algo como esto:

```css
html.light {
  --btnColor: #e66992;
}

html.dark {
  --btnColor: #ffa7c4;
}

button {
  background: var(--btnColor);
}
```

Cada vez que nuestra clase de html cambie a `dark`, el botón va a cambiar su color de background por el color que especificamos en la regla `html.dark`, si cambiamos la clase a `light` entonces el color va cambiar de nuevo, esta vez usando la regla de `html.light`.

La primera cosa que vas a notar si nunca has visitado mi blog, es que el tema por defecto hace match con el tema utilizado por tu sistema operativo. Por ejemplo si usas macOS, con Mojave o superior, con el tema oscuro, si acceden a mi blog van a ver el blog con su tema oscuro. Esto se hace gracias a una propiedad de css que se llama `prefers-color-scheme`. De acuerdo a [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) este feature detecta si el sistema del usuario es claro o oscuro.

Por ejemplo si añades esta variable a la consola del browser:

```js
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
```

Vas a recibir un objeto como este:

```js
{
  media: "(prefers-color-scheme: dark)",
  matches: true,
  onchange: null
}
```

El objeto como tal contiene un atributo que se llama `matches`, que retorna un booleano si el `prefers-color-scheme` pasado, en este caso fue oscuro, hace match con el que nuestro sistema posee, en este caso el match es `true` porque el tema de mi computadora es `dark`, pero si el tuyo usa un tema claro `light` va a retornar `false`.

Si quieres hacer override de eso y que el usuario pueda cambiar el tema acuerdo a sus gusto, podemos hacerlo utilizando el `localStorage`, porque ahí podemos guardara el valor seleccionado y usarlo cada vez que el usario ingresa a la página.

If you want to override those settings and let the user to choose the theme and persist it, you will have to use `localStorage`, because you'll have to store the user selected value and use it everytime the user access the page.

Guardar el valor se puede hacer de la siguiente manera:

```js
// Sets a variable called with key theme and value dark.
localStorage.setItem('theme', "dark");

// Gets the value of the localStorage key called theme
localStorage.getItem('theme');
```

Entonces el código deberia tener una función que trae y setea ese valor, es mejor tenerlo en un script que carga antes del SPS(en mi caso react), entonces tiene sentido tenerlo en el objecto window como atributos, tiene bastante sentido. Overreacted.io tiene una [función](https://github.com/gaearon/overreacted.io/blob/c85f9f79eda9a4e5db161273a9ed3234479605f6/src/html.js#L21) que maneja todos los casos de uso. Yo la utilice para este blog para resolver un **bug** que estaba desde el día uno. El bug era que el tema siempre cargaba por unos segundos el tema claro antes de pasarse al oscuro, incluso sí el `localStorage` tenia como valor el oscuro.

## Conclusiones

* Usar el método de google fonts tiene mucho sentido si quieres compatibilidad cross browser, puede servir incluso en IE11 y sabemos que en entornos corporativos, muchas aún utilizan IE11 y existen muchos devs batallando con eso.
* Theme UI es una herramienta brillante, hace las cosas mucho mas sencillas y menos estresantes, fácil de configurar. Las contras son el ~~browser support~~, mucha gente no esta acostumbrada a hacer los estilos dentro de jsx y por el momento es compatible solo con React.
* El método de mi blog, es bastante bonito y más DIY, pero hay que tomar las consideraciones con el `localStorage` y la propiedad `prefers-color-scheme`, vamos a tener que lidiar con incompatibilidad de browser, porque yo uso variables de css y el `prefers-color-scheme` tampoco funciona.
* Es importante recalcar, que sin contar `theme-ui`, podemos implementar cualquier approach que queramos, utilizando css y javascript. es solamente cambiar el atributo de un nodo(en este caso la clase), lo unico es ver como manejamos ese evento.

Entonces.., sí tuviera la oportunidad de empezar de nuevo, usaria `theme-ui`, aunque no soy muy fan de hacer los estilos en el componente, creo que hace el setup mas fácil y modificable, si el soporte de navegadores viejos es importante, entonces creo que hace sentido un método mas tradicional... (duplicar las clases de css con el color inverso).
