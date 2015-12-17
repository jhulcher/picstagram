class Api::PicsController < ApplicationController
  before_filter :require_signed_in!

  # def index
  #   @pics = User.find(params[:user_id]).pics
  # end

  def index
    @pics = current_user.pics
  end

  def show
    @pic = Pic.find(params[:id])
  end

  def create
    @pic = Pic.new(pic_params)
    @pic.user_id = current_user.id
    @pic.save!
    render json: @pic
  end

  def destroy
    @pic = Pic.find(params[:id])
    @pic.destroy!
    render json: @pic
  end

  private
  def pic_params
    params.require(:pic).permit(:public_id)
  end
end
