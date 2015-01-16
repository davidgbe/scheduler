class Section < ActiveRecord::Base
  belongs_to :klass
  has_many :sections_teachers_relations, dependent: :destroy
  has_many :teachers, through: :sections_teachers_relations, :autosave => true
end