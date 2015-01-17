class Section < ActiveRecord::Base
  belongs_to :klass
  has_many :sections_teachers_relations, dependent: :destroy
  has_many :teachers, through: :sections_teachers_relations, :autosave => true

  def teacher_names
    teachers.map do |t|
      (t.first_name ? t.first_name.downcase : '') + ' ' + (t.last_name ? t.last_name.downcase : '')
    end
  end
end