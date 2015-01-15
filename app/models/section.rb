class Section < ActiveRecord::Base
  belongs_to :klass
  has_many :teachers, through: :sections_teachers

  def teacher_name 
    teacher ? teacher.name : ''
  end

end