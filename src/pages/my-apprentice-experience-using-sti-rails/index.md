---
title: My apprentice experience using STI in RoR
date: 2018-11-29T20:45:57.427Z
description: Lessons learnt
---

Right now I’m almost done with the project I’ve been working on the past three and a half months, my first real rails app and my **first** project at Pernix. It has been an awesome experience for me because I have learned a lot of new stuff and I’m starting to feel very comfortable using the framework.

I used Rails before entering the company, I did the “hello world” rails project(the **blog** ), the one everyone does when learning the framework. While I was not totally sure about the concepts and stuff that I was doing at the moment, doing that was great because when I started this project, at least I had an idea of how the framework works. Nonetheless much of the ORM stuff was a big deal to me, I didn’t know how to use some of the active record associations.

When we were starting with the modeling process, I notice that we were going to use lot of associations between our models and I was a little scared on how I was going to make those associations work with Rails.

I was on charge of creating the User model, I used **devise** of course, but the User was not a simple plain User, every user required to have a role, I used to do that by just creating a column called _role_ that uses the active record Enum(you can find that on the devise [docs](https://github.com/plataformatec/devise/wiki/How-To:-Add-an-Admin-Role#option-3-using-active-record-enum)). While this approach is good, in this project it was not the best, because each role had custom info, but making different models was not a good approach as well because they shared a lot of stuff.

At first I used a polymorphic association.

```ruby
class User < ApplicationRecord
  belongs_to :account, polymorphic: true, dependent: :destroy
end

class Admin < ApplicationRecord
  has_one :user, as: :account
end

class Mentor < ApplicationRecord
  has_one :user, as: :account
end

class Client < ApplicationRecord
  has_one :user, as: :account
end
```

In order for this to work you just need to add two new columns under the User table **account_id** and **account_type** , rails convention tells you to name those columns whatever you want but they should end with **able**. On my case I avoid using **accountable** instead of account because accountable has nothing to do with the context in which it is being used on this project.

This approach worked, if you wanted to know the role of an user you just needed to access:

```bash
user.account
```

And that is going to give you the associated table row which in this case could be and Admin a Client or a Mentor. In that way I can share the User columns and add the custom role columns in the other models.

And if you wanted to retrieve the user columns for the Admin role for example you needed to use:

```bash
admin.user
```

Then a new project leader came and he did a refactor of all my role management code and switched to **STI**. That made me demotivate a little, because I was feeling pretty happy with my polymorphic approach but at the end STI turned out to be the best approach and the nicer to look at.

STI main difference with polymorphic association is that all roles are stored in one table and differences all of them in a column called type. Notice that on polymorphic association all the models inherit from application record? That’s not the case with STI association.

```ruby
class User < ApplicationRecord

end

class Admin < User

end

class Mentor < User

end

class Client < User

end
```

As you can see on my example the roles inherit from User not from application record, so basically if you call an user

```bash
user
```

It’ll display the user object with the role, you don’t need to call the association as well. That applies with calling the role itself.

```bash
admin
```

The only problem with STI is that if you store everything in one table it’s going to get very populated with lots of columns. This project in order to avoid that problem uses a has_one association with another table which is going to store custom role columns. For example the Client model has an association with a model called ClientInfo

```ruby
class Client < User
 has_one :client_info, dependent: :destroy
end

class ClientInfo < ApplicationRecord
 belongs_to :client, dependent: :destroy
end
```

In that way we can avoid populating the User table and we can have differences between the models, like custom associations or custom fields that are not shared with each other.

For me, understanding associations it is very important on rails or any framework that uses an ORM, because manipulating data can be very tricky if you don’t know how to use it properly.
