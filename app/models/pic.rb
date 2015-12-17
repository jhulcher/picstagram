class Pic < ActiveRecord::Base
  validates :user_id, presence: true
  validates :public_id, presence: true
  validates :public_id, uniqueness: true

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: "User"
end
