class CreateSchedulesKlasses < ActiveRecord::Migration
  def up
  	create_table :schedules_klasses_relations do |t|
      t.column :schedule_id, :integer
      t.column :klass_id, :integer
    end
  end

  def down
  	drop_table :schedules_klasses_relations
  end
end
