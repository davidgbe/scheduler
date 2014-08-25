class Section < ActiveRecord::Base
  belongs_to :klass
  belongs_to :teacher

  def days
    @days
  end

  def start
   start_time = @start.to_s.sub(':', '')
   start_time[1] == ':' ? (start_time + '0') : start_time
  end

  def hours
    @hours
  end

  def teacher_name 
    teacher ? teacher.name : ''
  end
end