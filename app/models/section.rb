class Section < ActiveRecord::Base
  belongs_to :klass
  belongs_to :teacher

  searchable do
    text :days do
      days.downcase
    end
    text :start do
      start.to_s.gsub(/:/, '')
    end
    #double :hours
  end   

  def teacher_name 
    teacher ? teacher.name : ''
  end
end