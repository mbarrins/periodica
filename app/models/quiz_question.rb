class QuizQuestion < ApplicationRecord
  belongs_to :quiz
  belongs_to :question
  belongs_to :element

  def add_result
    self.result = self.user_answer.downcase == self.correct_answer.downcase
    self.save
  end
end
