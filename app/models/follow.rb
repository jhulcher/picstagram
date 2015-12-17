class Follow < ActiveRecord::Base
  validates :follower_id, presence: true
  validates :followed_id, presence: true
  # validate :not_currently_following
  # validates :follower_id, :uniqueness => true, :scope => :followed_id
  validates_uniqueness_of :follower_id, scope: :followed_id

  belongs_to :follower,
  primary_key: :id,
  foreign_key: :follower_id,
  class_name: "User"

  belongs_to :followee,
  primary_key: :id,
  foreign_key: :followed_id,
  class_name: "User"

  # private
  # def not_currently_following
  #   current_user.followees.include?
  #   Follow.
  # end
end
