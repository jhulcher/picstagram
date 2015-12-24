class Pic < ActiveRecord::Base
  validates :user_id, presence: true
  validates :public_id, presence: true
  validates :public_id, uniqueness: true

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: "User"



  has_many :comments,
  primary_key: :id,
  foreign_key: :pic_id,
  class_name: "Comment"



  has_many :likes,
  primary_key: :id,
  foreign_key: :pic_id,
  class_name: "Like"

  has_many :likers,
  through: :likes,
  source: :liker

  has_one :likee,
  through: :likes,
  source: :likee
end
