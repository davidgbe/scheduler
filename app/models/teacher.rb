class Teacher < ActiveRecord::Base
  has_many :sections, through: :sections_teachers
end