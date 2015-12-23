class Api::LikesController < ApplicationController
  before_filter :require_signed_in!

  def create
    @like = Like.new(like_params)
    @like.liker_id = current_user.id
    @like.save!
    render json: @like
  end

  def destroy
    @like = Like.find_by(pic_id: params[:id], liker_id: current_user.id)
    @like.destroy!
    render json: @like
  end

  private
  def like_params
    params.require(:like).permit(:pic_id)
  end

end
