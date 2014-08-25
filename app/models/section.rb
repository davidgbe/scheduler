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
    text :teacher_name do 
      teacher.name
    end
    
  end   
end