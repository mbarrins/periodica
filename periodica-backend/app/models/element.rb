class Element < ApplicationRecord
  belongs_to :classification
  has_many :user_quiz_elements
end
