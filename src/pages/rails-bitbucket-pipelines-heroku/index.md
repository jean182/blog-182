---
title: Setting up a rails app with bitbucket pipelines, with automatic deployment to Heroku.
date: 2018-12-18T04:04:44.427Z
description: Using CI with bitbucket.
---

On college I was assigned to develop a continuous integration system, using whatever language or framework I wanted to, so I decided to use RoR. This post will highlight some of the steps you need to do in order to make this work. This post is aimed to briefly describe all the steps I did to make the CI using bitbucket pipelines.

First create a new rails application, we use -T to skip rails stock testing(we’re going to use Rspec here) and postgresql as the database:

```bash
$ rails new ci-conceptual -T --database=postgresql
```

With the newly created app, I usually add the following dependencies into the GEMFILE

```ruby
group :development, :test do

  gem 'pry'

  gem 'pry-remote'

  gem 'rspec-rails'

  gem 'factory_bot'

  gem 'shoulda-matchers'

  gem 'factory_bot_rails'

end

group :development do

  gem 'listen'

  gem 'web-console'

  gem 'spring'

  gem 'erb2haml'

  gem 'rails-erd', require: false

  gem 'rubocop', '~> 0.46.0', require: false

end

group :test do

  gem 'simplecov', require: false

  gem 'database_cleaner'

end
```

A brief explanation for this gems, they are mostly used for testing and development purposes, **rubocop** for the linter check, **erb2haml** is one that I use to convert all my ERB files to HAML(I prefer using haml instead of erb), **rails-erd** is for generating an Entity Relation diagram PDF file, based on the current database schema, **simplecov** is for checking the test coverage of our project and the rest is mostly used to do unit testing.

Then you need to configure your testing environment, I won’t dig to much into the setup because that’s not the post intention. This is focused into having a project with linter checking and unit testing, so basically when using rspec you are going to have a folder under your root directory called spec that is going to contain the tests for your app; models, helpers, controllers, routers and factories in most cases.

Rubocop on the other hand is the one that is needed for linter checking, essentially you need to create a **yml** file called .rubocop which is going to contain all the rules you want to use for your project; for example the method length or the line length to mention a few. They have a lot of [rules](https://github.com/github/rubocop-github/blob/master/STYLEGUIDE.md) that are defined by the ruby community but you’re free to use the ones you want to.

After setting up that we need to create a repo in bitbucket in order to use their pipelines, a **bitucket pipeline** is basically a docker container in which you’re recreating the app environment, in this case a ruby on rails app. We can define scripts that are going to run when we push our code into the remote repository. This is very useful as it let us run custom scripts to check that our code is complying with everything we want to define or even perform jobs and tasks for our remote sites.

With this in mind we need to create a file called **bitbucket-pipelines.yml** which is going to run all the scripts we want to, and even better it let us define the remote branch we want to run those scripts, that’s very useful if you want to run different scripts according to the branch, or even better, define deployment environments.

On my project I have a folder called deploy-scripts and they contain **sh** scripts that can be executed on the docker container because is running **Ubuntu.** I did not create the scripts but you can find some of them [here](https://bitbucket.org/rjst/heroku-deploy/src/master/), kudos to the developer who made that possible. The scripts are used for deploying an app to heroku using bitbucket. For this to work you need to create a heroku app and if you want to create different environments you could follow this [guide](https://devcenter.heroku.com/articles/multiple-environments) as well.

If you already created the app you need to go under your repository go to settings/repository\_variables and add a variable **HEROKU\_API\_KEY** which you can get typing on your terminal if you have the heroku command line installed

```bash
$ heroku auth:token
```

That should give you the value of the variable, you need to put the name exactly like your the one under your script in order for that to work. With that in mind you just need to configure the bitbucket-pipelines.yml file which is going to end up looking like this.

`gist:jean182/54e03ff152cdbe11ef31449409087e6f#bitbucket-pipelines.yml`

You can configure this file based on your needs, in my particular case I wanted to run _rubocop_ and _rspec_ everytime I pushed code to the remote repo. And I wanted to deploy to my particular heroku environment everytime I pushed something to a certain branch. On this case, my branches for deploying are [**master**](https://ci-conceptual.herokuapp.com), [**staging**](https://ci-conceptual-staging.herokuapp.com) and [**development**](https://ci-conceptual-development.herokuapp.com) (you can click on them to show the actual sites) and they are deploying to three different _heroku_ apps that are using the same token.

That’s pretty cool because it lets you create sites that you can use for internal, external testing and as well as a production environment, for example if you want the client to test on a certain site, but you don’t want the developers to test on that site.

This is the [repo](https://bitbucket.org/jean-182/ci-conceptual/src/develop/) if you want to check the deployment scripts folder, the rubocop config and rspec configuration. I’m a software apprentice so feel free to correct me or comment on how to improve this post.
