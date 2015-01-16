class CreateSectionsTeachers < ActiveRecord::Migration
  def up
    create_table :sections_teachers_relations do |t|
      t.column :section_id, :integer
      t.column :teacher_id, :integer
    end
  end

  def down
    drop_table :sections_teachers_relations
  end
end