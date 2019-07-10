class QuizQuestionsSerializer < ActiveModel::Serializer
  attributes :id, :quiz_id, :question_string, :correct_answer

  def attributes(*args)
    hash = super

    if self.object.user_answer
      hash[:user_answer] = self.object.user_answer
    end

    if self.object.result
      hash[:result] = self.object.result
    end

    hash
  end

  attribute :question_for do 
    self.object.element.name
  end

  attribute :question_on do 
    self.object.question.quiz_field
  end
end
