class Comment < ActiveRecord::Base
  validates :user_id, presence: true
  validates :pic_id, presence: true
  validates :body, presence: true
  validates_length_of :body, :minimum => 1, :maximum => 35, :allow_blank => false

  belongs_to :pic,
  primary_key: :id,
  foreign_key: :pic_id,
  class_name: "Pic"

  belongs_to :author,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: "User"
end
