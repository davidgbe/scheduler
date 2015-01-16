class Teacher < ActiveRecord::Base
  has_many :sections_teachers_relations, dependent: :destroy
  has_many :sections, through: :sections_teachers_relations, :autosave => true
end