class Schedule < ActiveRecord::Base
  belongs_to :user
  has_many :klasses, through: :schedules_klasses
end