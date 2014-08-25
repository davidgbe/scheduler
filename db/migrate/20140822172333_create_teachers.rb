class CreateTeachers < ActiveRecord::Migration

  def up
    create_table :teachers do |t|
      t.string :name
      t.string :email
      t.text :personal_url
      t.timestamps
    end
  end

  def down
  	drop_table :teachers
  end
end