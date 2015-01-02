collection @klasses
attributes :id, :subject, :level, :prerequisites, :corequisites, :description, :dept_title, :title
child :sections do 
  attributes :days, :start, :finish, :max_capacity, :current_capacity 
end