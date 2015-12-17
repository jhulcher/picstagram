class Follow < ActiveRecord::Base
  validates :follower_id, presence: true
  validates :followed_id, presence: true
  validates_uniqueness_of :follower_id, scope: :followed_id

  belongs_to :follower,
  primary_key: :id,
  foreign_key: :follower_id,
  class_name: "User"

  belongs_to :followee,
  primary_key: :id,
  foreign_key: :followed_id,
  class_name: "User"
end
