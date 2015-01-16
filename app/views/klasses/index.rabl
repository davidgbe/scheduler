collection @klasses
attributes :id, :subject, :level, :prerequisites, :corequisites, :description, :dept_title, :title
child :sections do 
  attributes :id, :days, :start, :finish, :max_capacity, :current_capacity
  child :teachers do
    attributes :id, :first_name, :last_name
  end
  # node :teachers do |t|
  #   t.teachers.all.map { |m| { 
  #     :id => m.id,
  #     :first_name => m.first_name,
  #     :last_name => m.last_name
  #   } }
  # end
end