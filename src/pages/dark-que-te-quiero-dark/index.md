---
title: Dark theme, different ways to implement it.
date: 2020-01-20T11:22:25.427Z
description: A case study on how websites implement light and dark themes.
---

When I was first creating this blog, the first feature I wanted for it, was the ability to switch to a light or a dark theme. I remember that light and dark themes were already a thing since, even since I was installing custom ROMS in my galaxy s3 mini with android 4.1. There were some ROMS that provided the functionality to switch to a dark system ui, which was pretty awesome at the time, considering that until last year, we start seeing the feature in stock android and IOs - macOS.

So in this post I would go through on how some websites implement their themes; Most of them allow you to switch by using a toggle or button, some of them persist even if you close the browser and some of them may even choose the theme based on you OS preferences.

## Google Fonts.

First I would like to talk about the easiest and straight forward way to do it, I'm going to use [Google Fonts](https://fonts.google.com/) as the example.

Inspecting the site, you can see that they have a class in their html tag called `t-white`, and if you press the select background color button and choose the dark option you'll notice that the html class will change to `t-black`. The javascript code presumably changes the dom node class attribute to use the opposite `t-class` that is currently selected and that would change the whole UI. If we take a look a the css (we need to use a tool to beautify it), we can clearly see that they have declared the same classes for the `t-black` and `t-white` but with the respective changes to make it work for each theme.

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

What I like of this approach is that you have a dark and light theme that is compatible to every major browser, they are using plain css as it best, even though they write almost the same twice, it ensures cross browser compatibility(which is something very valuable since the others methods don't provide cross browser compatibility). The page does not persist your selection, so every time you refresh the page, the light theme will be the default one(thus this can be implemented).

## Gatsby approach.

Gatsby is a library for developing static websites(this blog is using it!) and their [page](https://www.gatsbyjs.org/) is pretty awesome. If you check through the project [repo](https://github.com/gatsbyjs/gatsby) you'll notice that they use a library called `theme-ui` to manage their styles including the light and dark theme. It is fairly easy to use, you need to a theme object, who's going to contain colors, typography and layout values. This theme allow you to specify [color modes](https://theme-ui.com/color-modes/), so you can specify different colors or settings according to your theme mode. Then you can use a custom hook `useColorMode` that allows you to **change or retrieve** the current mode *value*. Gatsby uses it in their `DarkModeToggle` component. You can see the code [here](https://github.com/gatsbyjs/gatsby/blob/65a6833beee71e7a46bb44bcfdcc565438d8e6ff/www/src/components/dark-mode-toggle.js#L126).

Take a look of this example taken from the docs

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

This code uses the `useColorMode` hook, that it looks like an `useState` hook with steroids, which is the one that does the dirty work for you. Check the [source](https://github.com/system-ui/theme-ui/blob/90066c9786bc3acbb3eb49ee32386c57760625e8/packages/theme-ui/src/color-modes.js) to see how awesome it is. Offtopic, but looking through this source code is truly inspirational and gives you a lot of cool ideas.

This approach is the easiest one to setup, and it will do the dirty work for you, because it can persist the choosen theme by storing the value in the local storage, `theme-ui` does it for you, less things to worry means you code happily. They also provide support for the `prefers-color-scheme` which we'll talk later. ~~One of the cons found is browser compatibility, IE11 does not have support for `prefers-color-scheme` neither for css variables~~.

**Update: They do offer the possibility of using the theme without css variables and the prefers-colors-scheme can be disabled** check this [section](https://theme-ui.com/color-modes#turn-off-custom-properties) of their docs.

## Loserkid

Now let's talk about my [blog](https://loserkid.io/) :p, I wrote the theme for this blog using tutorials on the web, which were mainly focus on using *css variables* and I leverage [overreacted.io](https://overreacted.io/) code as the inspiration for persisting the theme.

My theme and `theme-ui` use css variables, they are variables that contain specific values that are defined by us and can be reused across the whole stylesheet. For example I want my button to have a different color, depending on the html class. I can do something like this:

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

Every time that our html class changes to dark, the button will update its background to the color that we specify on the `html.dark` rule, if we change the class to light, then the color is going to change again, using the `html.light` rule.

The first thing you'll notice if you have never visit my blog, is that the default theme will match your OS theme, so for example if you have macOS Mojave or after, and you have your system theme default to dark, you'll see my blog with the dark theme.. This is done by using a cool css property called `prefers-color-scheme`. According to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) this media feature detects if the user uses a system light or dark theme.

For example if you add this variable to your browser console:

```js
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
```

You'll see that you will get an object like this:

```js
{
  media: "(prefers-color-scheme: dark)",
  matches: true,
  onchange: null
}
```

The object itself contains an attribute called `matches`, this will return a boolean if the `prefers-color-scheme` passed (in this case `dark`), matches your system specification, in my case matches attribute is `true` because my computer theme is `dark`, but if yours happens to be using a `light` theme, it will return false.

If you want to override those settings and let the user to choose the theme and persist it, you will have to use `localStorage`, because you'll have to store the user selected value and use it everytime the user access the page.

Storing and retreiving the value can be done like this:

```js
// Sets a variable called with key theme and value dark.
localStorage.setItem('theme', "dark");

// Gets the value of the localStorage key called theme
localStorage.getItem('theme');
```

So your code should have a function that gets and sets the value. It is better to have this on a script that loads before the SPA(in my case react), so having that as window object attributes, makes a lot of sense, since we can call them later. Overreacted.io has an awesome anonymous [function](https://github.com/gaearon/overreacted.io/blob/c85f9f79eda9a4e5db161273a9ed3234479605f6/src/html.js#L21) that handles every use case. I used it on this blog and I solve a **bug** that was since day one. The bug was that even though my theme was set to dark in the `localStorage`, it loaded the light theme first and then update it to the dark one.

## Conclusions

* Using the google fonts approach makes a lot of sense for cross browser support, we can have this working even for IE11 and you know that enterprise wise, a lot of companies are still stuck on IE11 and we have devs have to be fighting against it.
* Theme UI is a brilliant tool, makes things less stressful an easy to config out of the box. Cons are, ~~browser support~~, some people are not accostumed to style using jsx and well at the time is only compatible with react.
* My blog approach, is pretty nice and it is more DIY, just taking the considerations on localStorage, and this property `prefers-color-scheme`, you'll be dealing with browser incompatibility, since I used css variables and `prefers-color-scheme` won't work.
* It is important to say, that without counting `theme-ui`, we can implemente any approach we want using plain old js and css, it is just changing a node attribute, the only thing that changes is how the event is handled.

So if I had the opportunity to start over again, I would use `theme-ui` even though I'm not a huge fan of styling things in the component, I think it makes the setup easier and customizable, if browser support is a huge deal to you, then I'll guess using a more traditional approach would suit better your needs(yes... having duplicate classes with the inverse color).
