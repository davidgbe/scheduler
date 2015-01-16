class SchedulesKlassesRelation < ActiveRecord::Base
  belongs_to :klass
  belongs_to :schedule
end