class Api::PicsController < ApplicationController
  before_filter :require_signed_in!

  def index
    @pics = Pic.all
  end

  def show
    @pic = Pic.find(params[:id])
  end

  def create
    @pic = Pic.new(pic_params)
    @pic.user_id = current_user.id
    @pic.save!
  end

  def destroy
    @pic = Pic.find(params[:id])
    @pic.destroy!
    render json: {}
  end

  private
  def pic_params
    params.require(:pic).permit(:public_id)
  end
end
