# Picstagram

[Picstagram Link][heroku]
This domain's app is hosted via Heroku but accessed via www.picstagram.us.
[heroku]: www.picstagram.us


## Minimum Viable Product

Picstagram is a photo sharing web-app based on Instagram.

Users should be able to do the following:

- [ ] Create a user account
- [ ] Log-In and Log-Out using their user account
- [ ] View a chronological feed of photos uploaded by other users
- [ ] Click to 'like' a specific photo
- [ ] Add a comment to a specific photo
- [ ] Follow another user to have their Pics show up in their feed
- [ ] View a chronological feed of photos uploaded by a single user

## Visual Docs
* [See Wireframe Images][images]
* [See Database Schema][schema]

[images]: ./docs/views.md
[schema]: ./docs/schema.md


## Implementation Timeline


### Phase 1: User, Sessions: Models, Controllers, JSON API - approx. 1 days

A 'User' model and controller in order to allow users to create an account and
to sign-in/sign-out. A Sessions controller will be created. I will create JSON
API views for user sign-up and sign-in.

[Details][phase-one]


### Phase 2: Pic, Follow: Models, Controller, JSON API - approx. 2 days

A 'Pic' model and controller will be created in order to handle a users images.
A 'Follow' model and controller will be created in order for a user to add other
users to their feed of followed users. Pics belong to Users. Follows belong to
users. Some seed data will be created.

[Details][phase-two]

### Phase 3: Pic, Follow: React/Flux - approx. 2 day

React/Flux views will be created for Pics and Follows. Once signed in, the view
will either be a chronological feed of all users uploads, or a chronological
feed of the user's follows. Any feeds will include a single vertical row of
images.

[Details][phase-three]

### Phase 4: Like, Comment: Models, Controllers, JSON API - approx. 2 days

A 'Like' model and controller will be created in order to assign likes to a
given pic, which will also be linked the the user who did the liking.
A 'Comment' model and controller will be created for the generation of comments.
Likes belong to pics and users. Comments belong to Pics and Users. JSON API
views will be created in order to serve data to the front-end. More seed data
will be created and edited.

Add a search function which will allow a user to find another user by name. The
Search will take the user to the user page for the user that they searched, if
a user of that name exists.

[Details][phase-four]

### Phase 5: Like, Comment: React/Flux - approx. 2 day

Generic forms for adding likes and creating comments will be added and made
functional. Likes and comments for each image will be contained directly below
the image.

[Details][phase-five]

### Phase 6: CSS Beautification - approx. 1 day

I will employ CSS to style the site, centering everything. I want the site to
have a very polished and professional appearance, potentially using drop
drop shadows, transitions and photoshop in order to enhance the aesthetic. Much
of this will, of course, depend on what looks good as well as concrete time
constraints.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] User can upload a photo via their own user account
  (This is not a function of Instagram's main site)
- [ ] Add CSS transitions
- [ ] Create continuous update/scroll at bottom of feed

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
