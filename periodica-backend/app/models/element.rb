class Element < ApplicationRecord
  belongs_to :classification
  has_many :user_quiz_elements
  has_many :users, through: :user_quiz_elements

  def user_ids
    self.users.map{|user| user.id}
  end
end
