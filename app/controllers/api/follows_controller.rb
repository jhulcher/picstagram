class Api::FollowsController < ApplicationController
  before_filter :require_signed_in!

  def index
    @followees = current_user.followees
  end

  # def index
  #   @followee_pics = current_user.followee_pics
  # end

  def create
    @follow = Follow.new(follow_params)
    @follow.follower_id = current_user.id
    @follow.save!
    @followees = current_user.followees
    render 'index'
  end

  def destroy
    @follow = Follow.find_by(followed_id: params[:id], follower_id: current_user.id)
    @follow.destroy!
    @followees = current_user.followees
    render 'index'
  end

  private
  def follow_params
    params.require(:follow).permit(:followed_id)
  end

end
