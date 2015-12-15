# Schema

## Users
item            | type      | validations, indexed?
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_name       | string    | not null, unique, indexed
password_digest | string    | not null
session_token   | string    | not null, unique, indexed
session_token   | string    | not null, unique, indexed


## Pics (via cloudinary)
item            | type      | validations, indexed?
----------------|-----------|-----------------------
id              | integer   | not null, primary key
url             | string    | not null
thumb_url       | string    | not null
public_id       | string    | not null     (for potential editing pics)
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


## Follows (Join Table)
item            | type      | validations, indexed?
----------------|-----------|-----------------------
id              | integer   | not null, primary key
follower_id     | integer   | not null   (User who's choosing to follow someone)
followed_id     | integer   | not null   (User they're choosing to follow)
