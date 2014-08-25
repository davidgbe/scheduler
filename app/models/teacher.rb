class Teacher < ActiveRecord::Base
  has_many :sections

  searchable do
    text :name
  end
end