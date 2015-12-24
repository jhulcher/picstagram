class Api::CommentsController < ApplicationController
  before_filter :require_signed_in!

  def show
    @comment = Comment.find(params[:id])
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    @comment.save!
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy!
  end

  private
  def comment_params
    params.require(:comment).permit(:pic_id, :body)
  end
end
