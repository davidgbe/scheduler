require 'digest'
class User < ActiveRecord::Base
  has_many :schedules

  validates :user_name, uniqueness: { case_sensitive: false }, presence: true
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

end