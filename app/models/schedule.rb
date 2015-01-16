class Schedule < ActiveRecord::Base
  belongs_to :user
  has_many :schedules_klasses_relations, dependent: :destroy
  has_many :klasses, through: :schedules_klasses_relations, :autosave => true
end