class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token

  has_many :pics,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: "Pic"



  has_many :comments,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: "Comment"



  has_many :likes,
  primary_key: :id,
  foreign_key: :liker_id,
  class_name: "Like"

  def likable_pics
    Pic.joins(:likes).where(:user_id => id)
  end

  has_many :pics_liked,
  through: :likes,
  source: :pic

  has_many :follows,
  primary_key: :id,
  foreign_key: :follower_id,
  class_name: "Follow"

  has_many :followees,
  through: :follows,
  source: :followee

  has_many :followers,
  through: :follows,
  source: :follower

  has_many :followee_pics,
  through: :followees,
  source: :pics

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
