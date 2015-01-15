collection @klasses
attributes :id, :subject, :level, :prerequisites, :corequisites, :description, :dept_title, :title
child :sections do 
  attributes :id, :days, :start, :finish, :max_capacity, :current_capacity, :teacher_first, :teacher_last
end