require 'digest'
class User < ActiveRecord::Base
  has_many :schedules

  validates :email, uniqueness: { case_sensitive: false }, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, presence: true

  before_save :encrypt_password

  def encrypt_password
    if password.present?
      self.password = Digest::MD5.hexdigest(password)
    end
  end

  def self.authenticate(email, password) 
    user = User.find_by(email: email)
    if !user 
      raise 'No user was found'
    end
    user.password == Digest::MD5.hexdigest(password) ? user : nil
  end

end