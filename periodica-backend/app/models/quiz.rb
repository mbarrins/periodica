class Quiz < ApplicationRecord
  belongs_to :user
  has_many :quiz_questions

  def self.createWithQuestions(user)
    quiz = Quiz.create({user_id: user.id, status: 'created'})

    # Create quiz questions
    questions = Question.all
    question_fields = questions.map{|question| question.quiz_field}.uniq
    elements = Element.all

    elements.each do |element|
      question_fields.each do |quiz_field|
        question = questions.select{|question| question.quiz_field == quiz_field}.sample
        quiz_question = {
          quiz_id: quiz.id,
          question_id: question.id,
          element_id: element.id,
          question_string: question.question.sub('XXFIELDXX', element.send(question.question_field).to_s),
          correct_answer: element.send(question.answer_field).to_s
        }
        QuizQuestion.create(quiz_question);
      end
    end

    quiz
  end
end
