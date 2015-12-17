class Api::FeedsController < ApplicationController
  before_filter :require_signed_in!

  def index
    @followee_pics = current_user.followee_pics
  end

end
