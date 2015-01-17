class Klass < ActiveRecord::Base
  has_many :schedules_klasses_relations, dependent: :destroy
  has_many :schedules, through: :schedules_klasses_relations, :autosave => true
  has_many :sections

  searchable do 
    text :title
    integer :level
    text :subject 
    text :dept_title
    text :prerequisites
    text :corequisites
    text :description do 
      description.downcase if description
    end
    double :units
    #Section search params
    text :days do
      sections.map(&:days)
    end
    text :starts do
      sections.map(&:start)
    end
    text :finish do
      sections.map(&:finish)
    end
    #Teacher search params
    text :teacher_names
  end

  def teacher_names
    sections.map(&:teacher_names)
  end
end