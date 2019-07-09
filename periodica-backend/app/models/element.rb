class Element < ApplicationRecord
  belongs_to :classification
  has_many :user_quiz_elements
  has_many :users, through: :user_quiz_elements
  has_many :quiz_questions
  has_many :quizzes, through: :quiz_questions

  def classification_name
    self.classification.name
  end
end
