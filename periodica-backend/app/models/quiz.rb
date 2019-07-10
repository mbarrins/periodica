class Quiz < ApplicationRecord
  belongs_to :user
  has_many :quiz_questions

  # Creates a quiz and attaches questions
  # Takes in a user and the number of quiz questions to create
  # Returns the created quiz
  def self.createWithQuestions(user, no)
    quiz = Quiz.create({user_id: user.id, status: 'created'})
    questions = user.quiz_questions
    question_fields = Question.question_fields
    elements = user.elements_selection(no)
    question_selection = user.ques_selection(no)
    

    elements.each_with_index do |element, index|
      question_fields_selected = question_fields.sample(question_selection[index])
      question_fields_selected.each do |quiz_field|
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
