class Section < ActiveRecord::Base
  belongs_to :klass
  belongs_to :teacher

  def get_start
    start_time = self.start.to_s
    start_time['.'] = ':'
    start_time[1] == ':' ? (start_time + '0') : start_time
  end

  def teacher_name 
    teacher ? teacher.name : ''
  end

end