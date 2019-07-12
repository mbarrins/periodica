class QuizzesSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :status, :created_at, :updated_at

  def attributes(*args)
    hash = super

    questions_list = self.object.quiz_questions
    ques_correct = questions_list.reduce(0){|total, ques| total + (ques.result ? 1 : 0)}

    hash[:questions] = questions_list.length
    hash[:correct] = ques_correct

    if @instance_options[:incl_ques]
      hash[:quiz_questions] = self.quiz_questions
    end

    hash
  end

  def quiz_questions
    self.object.quiz_questions.sort{|question| question.id}.map do |question|
      hash = {
        id: question.id,
        question_string: question.question_string,
        correct_answer: question.correct_answer,
        question_for: question.element.name,
        question_on: question.question.subject.field
      }

      if question.user_answer
        hash[:user_answer] = question.user_answer
      end
  
      if !question.result.nil?
        hash[:result] = question.result
      end

      hash
    end
  end

end
