# Phase 4: Like, Comment: Models, Controllers, JSON API - approx. 2 days

## Rails

### Models
* Like
* Comment

### Controllers
* Api::LikesController (create, destroy)
* Api::CommentsController (create, index, destroy)

### Views
* api/pics/comments/index.json.jbuilder
* api/pics/likes/index.json.jbuilder


## React & Flux

### View Components
* Search field
* (A successful search will take the user to the UserIndex for the search query)

### Stores
* SearchedUsers
  (This store will be updated as characters are typed into the search bar,
    providing a dropdown list of users that actually exist. Clicking a username
    will take the user to the UserIndex for the user in question.)

### Actions
* ApiActions.receiveAllUsers

### ApiUtils
* ApiUtil.fetchAllUsers

## Gems/Libraries
* React
* React-Dom
* Babel
* Babel-Loader
* Webpack
