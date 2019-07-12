class Question < ApplicationRecord
  has_many :quiz_questions
  has_many :quizzes, through: :quiz_questions
  has_many :user_questions
  has_many :users, through: :user_questions
  belongs_to :subject

  def self.question_fields
    Question.all.map{|question| question.quiz_field}.uniq
  end

  def self.question_fields_with_user(user_id)
    if User.find(user_id).user_questions.exists?

    end

    Question.all.map{|question| question.quiz_field}.uniq.map do |type|
      hash = {
        type: type,
        name: type,
        selected: quiz_elements.map{|uqe| uqe.user.id}.include?(user_id),
      }

      if User.find(user_id).user_questions.find_by(user_idUs: user_id)
        hash[:user_quiz_element_id] = quiz_elements.find_by(user_id: user_id).id
      end

      return hash

    end
  end
end
