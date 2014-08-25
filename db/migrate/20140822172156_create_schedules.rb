class CreateSchedules < ActiveRecord::Migration

  def up
    create_table :schedules do |t|
      t.belongs_to :user
    	t.timestamps
    end
  end

  def down
  	drop_table :schedules
  end
end
