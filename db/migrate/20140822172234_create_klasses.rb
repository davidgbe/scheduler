class CreateKlasses < ActiveRecord::Migration

  def up
    create_table :klasses do |t|
      t.text :title
    	t. :subject 
    	t.integer :level #e.g. 101
    	t.text :prerequisites #stringified arr of class names
      t.text :corequisites
      t.text :description
      t.float :units
      t.timestamps
    end
  end

  def down
  	drop_table :klasses
  end
end
