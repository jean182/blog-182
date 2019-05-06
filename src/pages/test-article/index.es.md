---
title: Artículo Prueba
date: 2018-10-29T16:25:37.046Z
description: Una lista que contiene debe tener gemas en los rieles gemas para su proyecto
---
En este post me gustaría hablar sobre algunas gemas que considero útiles al desarrollar un Proyecto Rails, que facilitan el desarrollo, que es la filosofía de Ruby, hacen que el programador sea feliz y productivo.



La primera gema se llama [devise] (https://github.com/plataformatec/devise). Es una gema indispensable para desarrollar una aplicación regular en Rails, es una aplicación de autenticación compuesta por 10 módulos, cada uno con una funcionalidad diferente y no todos son necesarios, por ejemplo, el [Omniauthable] (https: // El módulo www.rubydoc.info/github/plataformatec/devise/master/Devise/Models/Omniauthable) es para la autenticación con proveedores de terceros, por lo que no es un módulo esencial que puede elegir para no usarlo.



Para mí, hace la vida más fácil porque al usarla, está bastante seguro de que tendrá una lógica de autenticación que será bastante sólida y que reducirá mucho su trabajo porque ya no tiene la necesidad de hacerlo. construir una autenticación desde cero.



Solo para API, el dispositivo no tiene soporte de fábrica para JWT, por lo que debe implementarlo usted mismo o intentar usar este [gem] (https://github.com/waiting-for-dev/devise- jwt).



La segunda gema que me gustaría hablar es una que se llama [annotate] (https://github.com/ctran/annotate_models), la funcionalidad de esta gema es mostrar en sus clases de ruby un comentario que resuma el esquema actual.



By just using the command $ annotate, you’ll get your models, models specs and factories commented at the beginning with the current schema like this:

![Annotated-model](/img/annotate.png "Annotated-model")

As you can see this is very useful because when you’re creating the model logic, sometimes you forget which are the name of the columns that your current model has, so it’s pretty cool to have that feature. When you’re not using this gem what you would normally do is to go under db/schema.rb which is more time consuming than having those comments under the model.



The third gem is called[ rails-erd](https://github.com/voormedia/rails-erd) which generates an entity relationship diagram based on you current models. It’s really useful because sometimes when you have a lot of models, sometimes you get confused on the associations and even though you should have an ERD created before starting to code, having a gem that generates an ERD can help you see if you associated something wrong in the actual program.

![diagram-erd](/img/blogdomain.png "Example of an ERD diagram generated with rails-erd")

The last gem I’m going to mention is [simplecov](https://github.com/colszowka/simplecov) and the main function of it is to check what have you tested under your tests files and what you’re missing, it’s great because sometimes you forget to test some model methods or you forget to test one association and that’s when simplecov comes in handy because everytime you run specs you’ll see new files under coverage folder which contains the hmtl view of the simplecov generated results.

![simplecov-coverage](/img/simplecov-coverage.png "Coverage example")

Hope you’ll find this gems useful, I personally think they’re great and the good thing is that the majority of them can be used in any rails project.
