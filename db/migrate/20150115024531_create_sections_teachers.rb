class CreateSectionsTeachers < ActiveRecord::Migration
  def up
    create_join_table :sections, :teachers, table_name: :sections_teachers
  end

  def down
    drop_join_table :sections_teachers do
    end
  end
end
