var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var PicStore = require("../stores/pic.js");
var History = require("react-router").History;

var Pic = React.createClass({

  mixins: [History],

  getInitialState: function () {
    return (
      { pic: PicStore.find(parseInt(this.props.params.id)) }
    );
  },

  render: function () {
    return (
      <center>
      <div key={ this.state.pic.id } >
          this is a pic by { this.state.pic.username }
          <br></br>
          pic id: { this.state.pic.id }
          <br></br>
          { this.state.pic.publics_id }
          <br></br>
          { this.state.pic.created_at }
        </div>
      </center>
    );
  }

});

module.exports = Pic;
