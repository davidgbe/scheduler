class Klass < ActiveRecord::Base
  has_many :schedules, through: :schedules_klasses
  has_many :sections

  searchable do 
    text :subject 
    integer :level
    text :description do 
      description.downcase
    end
    #Section search params
    text :days do
      sections.map(&:days)
    end
    text :starts do
      sections.map(&:start)
    end
    text :hours do
      sections.map(&:hours)
    end
    #Teacher search params
    text :teacher_names do
      sections.map(&:teacher_name)
    end
  end
end