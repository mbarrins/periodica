class Question < ApplicationRecord
  has_many :quiz_questions
  has_many :quizzes, through: :quiz_questions
  has_many :user_questions
  has_many :users, through: :user_questions
end
