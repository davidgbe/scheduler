class SectionsTeachersRelation < ActiveRecord::Base
  belongs_to :section
  belongs_to :teachers
end