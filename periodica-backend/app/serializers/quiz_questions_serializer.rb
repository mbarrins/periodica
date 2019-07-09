class QuizQuestionsSerializer < ActiveModel::Serializer
  attributes :id, :quiz_id, :question_string, :user_answer, :correct_answer, :result

  attribute :question_for do 
    self.object.element.name
  end

  attribute :question_on do 
    self.object.question.quiz_field
  end
end
