require 'digest'
class User < ActiveRecord::Base
  has_many :schedules

  validates :user_name, uniqueness: { case_sensitive: false }, presence: true
  validates :email, uniqueness: { case_sensitive: false }, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, presence: true

  def self.encryptPassword(password)
    Digest::MD5.new(options['password']) 
  end
end