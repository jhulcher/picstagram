var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require("./util/api_util.js");
var UserStore = require("./stores/user.js");
var UserIndex = require("./components/user_index.jsx");
var ReactRouter = require('react-router');
var PicStore = require("./stores/pic.js");
var Pic = require("./components/pic.jsx");
var Album = require("./components/album.jsx");
var Feed = require("./components/feed.jsx");
var FeedEntry = require("./components/feed_entry.jsx");
var FolloweesStore = require("./stores/followees.js");

var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Router = ReactRouter.Router;

var App = React.createClass({
  render: function () {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ Feed } />
    <Route path="album" component={ Album } />
    <Route path="pic/:id" component={ Pic } />
  </Route>
);

ReactDOM.render(
  <Router>{ routes }</Router>,
  document.getElementById("root")
);
