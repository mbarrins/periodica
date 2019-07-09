class QuizzesSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :status, :created_at, :updated_at
  has_many :quiz_questions, serializer: QuizQuestionsSerializer
end
