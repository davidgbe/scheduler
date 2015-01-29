# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150115024531) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "klasses", force: true do |t|
    t.text     "dept_title"
    t.text     "title"
    t.integer  "level"
    t.text     "subject"
    t.text     "prerequisites"
    t.text     "corequisites"
    t.text     "description"
    t.integer  "units"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "schedules", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "schedules_klasses_relations", force: true do |t|
    t.integer "schedule_id"
    t.integer "klass_id"
  end

  create_table "sections", force: true do |t|
    t.integer  "klass_id"
    t.integer  "teacher_id"
    t.text     "days"
    t.text     "start"
    t.text     "finish"
    t.integer  "max_capacity"
    t.integer  "current_capacity"
    t.integer  "wait_quantity"
    t.text     "category"
    t.text     "location"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sections_teachers_relations", force: true do |t|
    t.integer "section_id"
    t.integer "teacher_id"
  end

  create_table "teachers", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string "first_name"
    t.string "last_name"
    t.text   "email"
    t.text   "password"
  end

end
