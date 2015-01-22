class CreateSections < ActiveRecord::Migration

  def up
    create_table :sections do |t|
      t.belongs_to :klass
      t.belongs_to :teacher
      t.text :days
      t.text :start #17.5
      t.text :finish
      t.integer :max_capacity
      t.integer :current_capacity
      t.integer :wait_quantity
      t.text :category
      t.text :location
      t.timestamps
    end
  end

  def down
  	drop_table :sections
  end
end
