var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require("./util/api_util.js");
var UserStore = require("./stores/user.js");
var UserIndex = require("./components/user_index.jsx");
var ReactRouter = require('react-router');
var User = require("./components/user.jsx");
var PicStore = require("./stores/pic.js");
var Pic = require("./components/pic.jsx");
var UserPicsIndex = require("./components/user_pics_index.jsx");

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
    <IndexRoute component={ UserIndex } />
    <Route path="user" component={ User } />
    <Route path="pics" component={ UserPicsIndex } />
  </Route>
);

ReactDOM.render(
  <Router>{ routes }</Router>,
  document.getElementById("root")
);
