class Section < ActiveRecord::Base
  belongs_to :klass
  belongs_to :teacher

  def teacher_name 
    teacher ? teacher.name : ''
  end

end