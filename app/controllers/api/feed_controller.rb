class Api::FeedController < ApplicationController
  before_filter :require_signed_in!

  def index
    @followee_pics = current_user.followee_pics.reverse
  end

end
