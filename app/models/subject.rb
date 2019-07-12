class Subject < ApplicationRecord
  has_many :user_question
  has_many :question

  def self.all_with_user(user_id)
    user = User.find(user_id)
    user_questions = user.user_questions
    subjects = Subject.all

    if !user_questions.exists?
      subjects.each do |subject|
        UserQuestion.create({user: user, subject: subject})
      end

      user_questions = user.user_questions
    end

    subjects.map do |subject|
      hash = {
        id: subject.id,
        field: subject.field,
        name: subject.name,
        selected: user_questions.map{|uq| uq.subject}.include?(subject)
      }

      if user_questions.find_by(subject: subject)
        hash[:user_question_id] = user_questions.find_by(subject: subject).id
      end
      
      hash
    end
  end
end
