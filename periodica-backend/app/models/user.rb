class User < ApplicationRecord
  has_many :user_quiz_elements
  has_many :elements, through: :user_quiz_elements
  has_many :user_questions
  has_many :questions, through: :user_questions
  has_many :quizzes
end
