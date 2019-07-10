class QuizzesSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :status, :created_at, :updated_at
  has_many :quiz_questions, serializer: QuizQuestionsSerializer

  def quiz_questions
    self.object.quiz_questions.order(:id)
  end

end
