# Schema

## Users
item            | type      | validations, indexed?
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_name       | string    | not null, unique, indexed
password_digest | string    | not null
session_token   | string    | not null, unique, indexed


## Pics
item            | type      | validations, indexed?
----------------|-----------|-----------------------
id              | integer   | not null, primary key
image           | binary    | not null          (I believe this is correct type)
user_id         | integer   | not null, indexed
likes           | integer   |

## Likes
item            | type      | validations, indexed?
----------------|-----------|-----------------------
id              | integer   | not null, primary key
pic_id          | integer   | not null, indexed
user_id         | integer   | not null, indexed       (The user who liked a pic)


## Comments
item            | type      | validations, indexed?
----------------|-----------|-----------------------
id              | integer   | not null, primary key
pic_id          | integer   | not null, indexed
user_id         | integer   | not null, indexed
body            | string    | not, null


## Follows
item            | type      | validations, indexed?
----------------|-----------|-----------------------
user_id         | integer   | not null   (User who's choosing to follow someone)
follow_id       | integer   | not null   (User they're choosing to follow)
