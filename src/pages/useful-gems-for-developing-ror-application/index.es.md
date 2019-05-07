---
title: Gemas útiles para el desarrollo de aplicaciones RoR.
date: 2018-10-29T16:25:37.046Z
description: Una lista que contiene las gemas que deberias tener en tu proyecto.
---

En este post me gustaría hablar sobre algunas gemas que considero útiles al desarrollar un Proyecto Rails, que facilitan el desarrollo, que es la filosofía de Ruby, hacen que el programador sea feliz y productivo.

La primera gema se llama [devise](https://github.com/plataformatec/devise). Es una gema indispensable para desarrollar una aplicación regular en Rails, es una aplicación de autenticación compuesta por 10 módulos, cada uno con una funcionalidad diferente y no todos son necesarios, por ejemplo, el [Omniauthable](https://www.rubydoc.info/github/plataformatec/devise/master/Devise/Models/Omniauthable) es para la autenticación con proveedores de terceros, por lo que no es un módulo esencial que puede elegir para no usarlo.

Para mí, hace la vida más fácil porque al usarla, se está bastante seguro de que se va tener una lógica de autenticación que será bastante sólida y que reducirá mucho el trabajo porque ya no existe la necesidad de construir una autenticación desde cero.

Para APIs, devise no tiene soporte de fábrica para JWT, por lo que se debe implementar por cuenta propia o intentar usar esta [gema](https://github.com/waiting-for-dev/devise-jwt).

La segunda gema que me gustaría hablar es una que se llama [annotate](https://github.com/ctran/annotate_models), la funcionalidad de esta gema es mostrar en sus clases de ruby un comentario que resuma el esquema del modelo actual.

Con solo usar el comando \$ annotate, se generaran sus modelos, specs de modelos y factories comentadas al principio con el esquema actual como este:

![Annotated-model](/img/annotate.png "Modelo Anotado")

Como se puede ver, esto es muy útil porque cuando se esta creando la lógica del modelo, a veces se olvida cuál es el nombre de las columnas que tiene el modelo actual, por lo que es genial tener esa función. Cuando no se usa esta gema, lo que se haría normalmente es ir db/schema.rb lo que lleva más tiempo que tener esos comentarios bajo el modelo.

La tercera gema se llama [rails-erd](https://github.com/voormedia/rails-erd) que genera un diagrama de entidad-realación basado en los modelos actuales. es realmente útil porque a veces cuando se tienen muchos modelos, a veces las asociaciones tienden a confundir y aunque se deberia crear un ERD antes de comenzar a codificar, tener una gema que genera un ERD puede ayudar a ver si se asocio algo incorrecto en el programa actual.

![diagram-erd](/img/blogdomain.png "Ejemplo de un diagrama ERD generado con rails-erd")

La última gema que voy a mencionar es [simplecov](https://github.com/colszowka/simplecov) y la función principal de esta es revisar lo que se a testeado en los specs y lo que no, es bastante bueno porque a veces uno se olvida de probar algunos métodos del modelo o se olvida de probar una asociación y ahí es cuando simplecov es útil porque Cada vez que ejecute, va generar en la carpeta de coverage una vista hmtl de los resultados generados por simplecov.

![simplecov-coverage](/img/simplecov-coverage.png "Ejemplo de coverage")

Espero que encuentren útiles estas gemas, personalmente creo que son geniales y lo bueno es que la mayoría de ellas se pueden usar en cualquier proyecto de rails.
