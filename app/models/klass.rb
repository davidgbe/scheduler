class Klass < ActiveRecord::Base
  has_many :schedules, through: :schedules_klasses
  has_many :sections

  # searchable do 
  #   text :subject 
  #   integer :level
  #   text :description do 
  #     description.downcase if description
  #   end
  #   #Section search params
  #   text :days do
  #     sections.map(&:days)
  #   end
  #   text :starts do
  #     sections.map(&:get_start)
  #   end
  #   text :hours do
  #     sections.map(&:hours)
  #   end
  #   #Teacher search params
  #   text :teacher_names do
  #     sections.map(&:teacher_name)
  #   end
  # end
end