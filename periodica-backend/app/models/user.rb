class User < ApplicationRecord
  has_many :user_quiz_elements
  has_many :elements, through: :user_quiz_elements
  has_many :user_questions
  has_many :questions, through: :user_questions
  has_many :quizzes

  def quiz_questions
    if (self.user_questions.exists?)
      questions = self.user_questions.map{|uq| Question.find(uq.question_id)}
    else
      questions = Question.all
    end
  end

  def quiz_elements
    if (self.user_quiz_elements.exists?)
      self.user_quiz_elements.map{|uqe| Element.find(uqe.element_id)}
    else
      Element.all
    end
  end

  def elements_selection(no)
    elements = self.quiz_elements
    elements.length > no ? elements.sample(no) : elements.shuffle
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
