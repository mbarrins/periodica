class Quiz < ApplicationRecord
  belongs_to :user
  has_many :quiz_questions

  # Creates a quiz and attaches questions
  # Takes in a user and the number of quiz questions to create
  # Returns the created quiz
  def self.createWithQuestions(user, no)
    quiz = Quiz.create({user_id: user.id, status: 'created'})
    question_set = user.question_set(no)

    question_set.each do |element, question|
        quiz_question = {
          quiz_id: quiz.id,
          question_id: question.id,
          element_id: element.id,
          question_string: question.question.sub('XXFIELDXX', element.send(question.question_field).to_s),
          correct_answer: element.send(question.answer_field).to_s
        }
        QuizQuestion.create(quiz_question);
    end
    quiz
  end

  def score
    self.quiz_questions.each{|question| question.add_result}
  end
end
