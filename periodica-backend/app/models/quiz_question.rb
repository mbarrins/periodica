class QuizQuestion < ApplicationRecord
  belongs_to :quiz
  belongs_to :question
  belongs_to :element

  def add_result
    self.result = self.user_answer == self.correct_answer
    self.save
  end
end
