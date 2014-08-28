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

ActiveRecord::Schema.define(version: 20140822173349) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "klasses", force: true do |t|
    t.string   "subject"
    t.integer  "level"
    t.text     "prerequisites"
    t.text     "corequisites"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "schedules", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "schedules_klasses", id: false, force: true do |t|
    t.integer "schedule_id", null: false
    t.integer "klass_id",    null: false
  end

  create_table "sections", force: true do |t|
    t.integer  "klass_id"
    t.integer  "teacher_id"
    t.text     "days"
    t.float    "start"
    t.float    "hours"
    t.integer  "max_capacity"
    t.integer  "current_capacity"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "teachers", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.text     "personal_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string "user_name"
    t.string "first_name"
    t.string "last_name"
    t.text   "email"
    t.text   "password"
  end

end
