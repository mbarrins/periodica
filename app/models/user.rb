class User < ApplicationRecord
  has_many :user_quiz_elements
  has_many :elements, through: :user_quiz_elements
  has_many :user_questions
  has_many :questions, through: :user_questions
  has_many :quizzes

  def quiz_questions
    self.user_questions.exists? ? self.questions : Question.all
  end

  def quiz_question_types 
    self.quiz_questions.map{|question| question.quiz_field}.uniq
  end

  def quiz_elements
    self.user_quiz_elements.exists? ? self.elements : Element.all
  end

  def question_set(no)
    element_ques = []

    questions = self.quiz_questions
    question_fields = self.quiz_question_types
    elements = self.elements_selection(no)
    question_selection = self.ques_selection(no)

    elements.each_with_index do |element, index|
      question_fields_selected = question_fields.sample(question_selection[index])
      question_fields_selected.each do |quiz_field|
        question = questions.select{|question| question.quiz_field == quiz_field}.sample
        element_ques << [element, question]
      end
    end

    element_ques.shuffle

  end

  def elements_selection(no)
    elements = self.quiz_elements
    elements.length > no ? elements.sample(no).shuffle : elements.shuffle
  end

  def ques_selection(no)
    elements = self.elements_selection(no)
    if elements.length == no
      ques_arr =  Array.new(no, 1)
    else
      ques_arr = Array.new(elements.length, no/elements.length)
      remaining = no - ques_arr.reduce(:+)
      while remaining > 0
        ques_arr[remaining-1] += 1
        remaining -= 1
      end
    end
    ques_arr
  end
end
