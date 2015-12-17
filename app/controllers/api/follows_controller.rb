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
    render json: @follow
  end

  def destroy
    @follow = Follow.find_by(followed_id: params[:id], follower_id: current_user.id)
    @follow.destroy!
    render json: @follow
  end

  private
  def follow_params
    params.require(:follow).permit(:followed_id)
  end

end
