class CreateSchedulesClassesJoinTable < ActiveRecord::Migration
  def up
  	create_join_table :schedules, :klasses, table_name: :schedules_klasses
  end

  def down
  	drop_join_table :schedules_klasses do
    end
  end
end
