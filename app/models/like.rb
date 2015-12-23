class Like < ActiveRecord::Base
  validates :pic_id, presence: true
  validates :liker_id, presence: true
  validates_uniqueness_of :liker_id, scope: :pic_id

  belongs_to :pic,
  primary_key: :id,
  foreign_key: :pic_id,
  class_name: "Pic"



  belongs_to :liker,
  primary_key: :id,
  foreign_key: :liker_id,
  class_name: "User"

  has_one :likee,
  through: :pic,
  source: :user
end
