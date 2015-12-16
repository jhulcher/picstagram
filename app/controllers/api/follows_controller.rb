class Api::FollowsController < ApplicationController

  def index
    @follows = Follow.where(follower_id: current_user.id)
    # render json: @follows
  end

  def create
    @follow = Follow.new(follow_params)
    @follow.save!
  end

  def destroy
    @follow = Follow.find_by(follow_params)
    @follow.delete!
  end

  private
  def follow_params
    params.require(:follow).permit(:follower_id, :followed_id)
  end

end
