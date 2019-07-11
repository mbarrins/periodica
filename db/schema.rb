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

ActiveRecord::Schema.define(version: 2019_07_10_153649) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "classifications", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "elements", force: :cascade do |t|
    t.string "name"
    t.string "symbol"
    t.integer "atomicNumber"
    t.bigint "classification_id"
    t.float "meltingPoint"
    t.float "boilingPoint"
    t.float "electronegativity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "atomicWeight"
    t.string "about"
    t.string "imgurl"
    t.index ["classification_id"], name: "index_elements_on_classification_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "question"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "quiz_field"
    t.string "question_field"
    t.string "answer_field"
  end

  create_table "quiz_questions", force: :cascade do |t|
    t.bigint "quiz_id"
    t.bigint "question_id"
    t.string "user_answer"
    t.string "correct_answer"
    t.boolean "result"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "element_id"
    t.string "question_string"
    t.index ["element_id"], name: "index_quiz_questions_on_element_id"
    t.index ["question_id"], name: "index_quiz_questions_on_question_id"
    t.index ["quiz_id"], name: "index_quiz_questions_on_quiz_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.bigint "user_id"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_quizzes_on_user_id"
  end

  create_table "user_questions", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "question_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_user_questions_on_question_id"
    t.index ["user_id"], name: "index_user_questions_on_user_id"
  end

  create_table "user_quiz_elements", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "element_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["element_id"], name: "index_user_quiz_elements_on_element_id"
    t.index ["user_id"], name: "index_user_quiz_elements_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "elements", "classifications"
  add_foreign_key "quiz_questions", "elements"
  add_foreign_key "quiz_questions", "questions"
  add_foreign_key "quiz_questions", "quizzes"
  add_foreign_key "quizzes", "users"
  add_foreign_key "user_questions", "questions"
  add_foreign_key "user_questions", "users"
  add_foreign_key "user_quiz_elements", "elements"
  add_foreign_key "user_quiz_elements", "users"
end