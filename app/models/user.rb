class User < ApplicationRecord
  has_many :user_quiz_elements
  has_many :elements, through: :user_quiz_elements
  has_many :user_questions
  has_many :subjects, through: :user_questions
  has_many :quizzes

  validates :username, uniqueness: true

  def quiz_questions
    if self.user_questions.exists?
      Question.all.select{|question| self.subjects.include?(question.subject)}
    else
      Question.all
    end
  end

  def subject_types
    self.subjects.empty? ? Subject.all : self.subjects
  end

  def quiz_elements
    self.user_quiz_elements.exists? ? self.elements : Element.all
  end

  def question_set(no)
    element_ques = []

    questions = self.quiz_questions
    question_fields = self.subject_types
    elements = self.elements_selection(no)
    question_selection = self.ques_selection(no)

    elements.each_with_index do |element, index|
      question_fields_selected = question_fields.sample(question_selection[index])
      question_fields_selected.each do |subject|
        question = questions.select{|question| question.subject == subject}.sample
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
