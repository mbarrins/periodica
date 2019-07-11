class UserQuizElement < ApplicationRecord
  belongs_to :user
  belongs_to :element
end
