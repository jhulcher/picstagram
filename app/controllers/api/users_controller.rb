class Api::UsersController < ApplicationController
  before_filter :require_signed_in!

  # #fix: should not be current user
  # def index
  #   @pics = current_user.pics
  # end

  def index
    @users = User.all
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end

end
