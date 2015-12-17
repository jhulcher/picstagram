class Api::UsersController < ApplicationController
  before_filter :require_signed_in!

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end

end
