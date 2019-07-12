class Subject < ApplicationRecord
  has_many :user_question
  has_many :question
end
