---
title: Rails API with a frontend built in React, Part I.
date: 2019-05-24T11:23:12.427Z
description: Setting up the API
---

More on this series:
[Part II](/rails-api-with-a-frontend-built-in-react-part-ii/) ⋮
[Part III](/rails-api-with-a-frontend-built-in-react-part-iii/) ⋮
[Part IV](/rails-api-with-a-frontend-built-in-react-part-iv/)

When I was learning react I was kind of dissapointed because I could not get a good tutorial on how to integrate rails with react. The only ones I found were using everything inside of rails(building a regular based rails app with weebpacker and react-rails). While this approach is cool and fast to set up, it does not work as a regular API, it is just a regular monolithic app(everything is contained in the app, the backend and the frontend). At the end with lot of research I managed to learn how to integrate those tools, it was not as hard as I thought and because it is an API it should be the same if we use another framework or tool that sends and receives JSONs.

So in this series I'll be showing you how to build a rails API, and connect that to react, plus I'll be using redux and redux saga which are one of my favorite tools to use when I'm using react and I'll be doing unit tests and using a linter for the rails API. I'm not a master in any of those tools but setting up a basic API with a nice frontend is something I can show you.

## Building the API

First we'll build a rails app which will be a basic app that will have movies and related artists, so lets get started. I'm using **Rails 5.2.3** and **Ruby 2.6.3**.

```bash
$ rails new movie-api -T -B --database=postgresql --api
```

The -T flag is for skipping rails default test engine _minitest_, because we're going to use _RSpec_, the -B flag is to skip the bundle install at the beginning, the --database is for choosing our db engine, we're using postgresql and --api is to create a rails based API to use just the things we'll need to and skip extra configuration we won't use.

For our first time setup this is what we're going to do:

1. When you have multiple rails projects, each with their own environment, each with different ruby versions and rails versions, you'll want to have a gemset defined for each one. In this case I have rvm installed on my machine so we'll need to specify rvm the gemset in the project.
2. I like to ignore the database.yml file, this is the one with the database credentials for every environment of the app, I think it should not be tracked by our version controller, because it contains sensitive information of our database.
3. Last but not least we need to add dependencies for unit testing, and code formatting.

### Defining the ruby gemset.

Did you see that when we run the _rails new_ we used the -B to skip the first bundle install. We did this because we need to tell rvm to create an specific gemset for this project(if there's no gemset yet), _a gemset is a container that keep the gems separate per project_, to avoid using global gems. In order to specify RVM to create a gemset this is what you need to run, in the root of your project of course.

```bash
$ echo "movie-api" > .ruby-gemset
```

This just creates a file called .ruby-gemset that is the one, rvm uses and looks for a gemset called "movie-api" in this case to see if that exists or if not, it creates a new gemset for that. You need to exit the project and enter again to see the new changes like this.

```bash
$ cd ..
$ cd movie-api
```

If done correctly you should see something like this, after running the commands I showed you.

![RVM Doing his thing](./setting-up-the-gemset.png)

That means that you can safely run bundle install and your gems will be installed in the project gemset and you won't break dependencies of other projects.

### Creating a database.yml template:

With our gemset ready, we need to ignore our database.yml which is located in the config directory. We will create a template file for guiding purposes and we will ignore the database.yml from git. On your project root run this to create the new template:

```bash
$ touch config/database.yml.template
```

The file should look like a regular _database.yml_ file, untouched, without any environment passwords or sensitive information:

```yml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: movie-api_development

test:
  <<: *default
  database: movie-api_test

production:
  <<: *default
  database: movie-api_production
  username: movie-api
  password: <%= ENV['MOVIE-API_DATABASE_PASSWORD'] %>
```

Now that we have the template ready we need to ignore the database.yml, we do that just adding this line to the gitignore

```
# Ignore the local database.yml
/config/database.yml
```

### Setting up development environment

We'll need to add rspec and rubocop for doing our unit testing and add some linter in order to have a coding standard for this project.

Rubocop is a development dependency, is not needed for testing or production environments, so we will add the gem in the Gemfile inside our development group.

```ruby
group :development do
  # ..rest of the gems in this block
  gem "rubocop", "~> 0.70.0", require: false
end
```

We will need to create a file called .rubocop.yml which is the one who's going to contain all the rubocop rules, this file is yours, so you can customize it according all your needs, sometimes there are rules that you don't want to use, but as I explained it is important to define at least some that will make the code in the repo more consistent. For example I prefer to use double quotes instead single ones, so that will be a rule I'm going to add to this project. This file is located on the root of your project.

```bash
$ touch .rubocop.yml
```

Lets add a few rules.

```yml
AllCops:
  Exclude:
    - "db/schema.rb"
    - "db/migrate/*.rb"
    - ".bundle/**/*"
    - "bin/**/*"
    - "vendor/**/*"
    - "**/config/**/*"
  TargetRubyVersion: 2.6

Rails:
  Enabled: true

Metrics/LineLength:
  Max: 130

Metrics/MethodLength:
  Max: 20
  Exclude:
    - "db/**/*"

Metrics/BlockLength:
  Max: 10
  Exclude:
    - "spec/**/*"
    - "config/routes.rb"
```

Basically the code above is part of my .rubocop.yml, it defines a few rules for my project, for example the line length should not be more than 130 words. The others are as well self explanatory and you can see theres an exclude block which basically ignores the files or directories you want. In this use case for example I choose not to mess with a lot of rails generated configuration files and as well all the future migrations, because those files should not be touched after being committed.

If you want to check all your files you just have to enter:

```bash
$ rubocop
```

For checking a certain file, in this case we'll be checking the ApplicationController

```bash
$ rubocop app/controllers/application_controller.rb
```

This should return an output like this if there's an offense found, an offense is when the code is not complying with the rubocop.yml

![Rubocop offense](./rubocop-offense.png)

So great now we have found an error on our ApplicationController, how should we fix it? So we can do it manually or we can try this:

```bash
$ rubocop -a app/controllers/application_controller.rb
```

The -a means that rubocop will try to correct the file automatically, there are some offenses which cannot be corrected like that and you have to do it manually, for example when a method is too long.

![Rubocop offense corrected](./rubocop-offense-corrected.png)

Now that you know about rubocop we'll try to correct our project offenses, rails by default brings some offenses for our project, is not that their code is bad in any means, it just means that some of the rules I'm using are not beig used by then. So we'll run rubocop to try to fix all our files. Lets see the output:

![All offenses fixed](./offenses-fixed.png)

Rubocop was able to fix all of that by just running a single command, it is a very helpful feature for our API, because our code will be consistent through all the project.

With rubocop installed we're going to be installing RSpec for testing purposes. RSpec is in charge of checking your unit tests, it is widely used by the rails community and normally all the projects are tested using RSpec. To clarify, RSpec and Rubocop are gems for ruby, not just for rails, so any project that is made using ruby can benefit of the two.

To add RSpec we just simply need to add it to the gemfile in the development and test groups.

```ruby
group :development, :test do
  # ..rest of the gems in this block
  gem "rspec-rails", "~> 3.8"
end
```

Then we need to run these in the terminal:

```bash
# Download and install
$ bundle install

# Generate boilerplate configuration files
$ rails generate rspec:install
```

You will have a few generated files for RSpec, and now you will be able to run in your terminal:

```bash
$ rspec
```

That command is pretty useless right now because we don't have nothing to test and in this part we will not create anything to test, but for extra dependencies for RSpec I'll add a few more gems.

The first gem we will add is shoulda matchers, this gem is very useful to test your model associations and server side validations, which are widely used in a rails project. We need to add shoulda in our gemfile as well:

```ruby
group :test do
  # ..rest of the gems in this block
  gem "shoulda-matchers"
end
```

After running bundle install we need to specify RSpec to make use of shoulda in our test suite, so we need to add a few lines in the rails_helper.rb file which was generated when we installed Rspec.

```ruby
# Shoulda matchers configuration
Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

# Add matchers configuration before this block
RSpec.configure do |config|
  # Bunch of code here....
end
```

There are a lot of possible configurations for shoulda, but in this case we're using RSpec and Rails. With just that we have all the matchers set and ready to be used.

The second gem useful for testing is called FactoryBot and help us to declare defined fixtures for our model, for example if we have an User model with X quantity of attributes, we just need to add a new factory with the user model, so we can invoke it in our tests. This is an example of an User model factory:

```ruby{9-11}
FactoryBot.define do
  factory :user do
    email { "johndoe@email.com" }
    password { "123456" }
    password_confirmation { "123456" }
    username { "johndoe" }
    uid { email }

    trait :without_username do
      username { nil }
    end
  end

end
```

This factory helps us build an user when we're running tests, so it creates that user for certain test, it is really helpful because it avoids the duplication of code and let us create special cases for that user model, in the example above, the **highlighted** code is a special case when the username is blank.

To add factory bot in our project we need to put it under the development, test group, same as RSpec, and then run bundle install

```ruby
group :development, :test do
  # ..rest of the gems in this block
  gem "factory_bot_rails"
  gem "rspec-rails", "~> 3.8"
end
```

As with shoulda matchers, we need to add them in the rails_helper.rb in order to be able to use it with RSpec

```ruby
RSpec.configure do |config|
  # ...rest of the block
  # Factory Bot
  config.include FactoryBot::Syntax::Methods
end
```

We have everything set up, now I will add a last gem that will be very useful for seeding the database with dummy data, the gem is called Faker. We just need to add it in our development test code block in the Gemfile

```ruby
group :development, :test do
  gem "faker", git: "https://github.com/stympy/faker.git", branch: "master"
end
```

I know this was a long post, and kind of boring because we just set up everything, but in the next one we will create the Movie resource and the tests for it, we will be using **serializers** to render the JSON content and we will be adding **CORS** support to the app. Hope you like this post and don't forget to subscribe.
