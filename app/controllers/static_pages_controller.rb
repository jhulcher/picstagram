class StaticPagesController < ApplicationController
  before_filter :require_signed_in!

  def root
    render :root
  end

end
