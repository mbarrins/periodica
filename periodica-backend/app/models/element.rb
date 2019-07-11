class Element < ApplicationRecord
  belongs_to :classification
  has_many :user_quiz_elements
  has_many :users, through: :user_quiz_elements
  has_many :quiz_questions
  has_many :quizzes, through: :quiz_questions

  def classification_name
    self.classification.name
  end

  def self.cache_all
    Rails.cache.fetch("elements/all", expires_in: 12.hours) do
      Element.all.sort_by{|element| element.atomicNumber}.map do |element|
        {
          id: element.id,
          name: element.name,
          symbol: element.symbol,
          atomicNumber: element.atomicNumber, 
          meltingPoint: element.meltingPoint,
          boilingPoint: element.boilingPoint,
          electronegativity: element.electronegativity,
          atomicWeight: element.atomicWeight,
          classification_id: element.classification_id,
          classification_name: element.classification.name,
          classification_description: element.classification.description
        }
      end
    end
  end

  def self.select_all(user_id)
    Element.all.sort_by{|element| element.atomicNumber}.map do |element|
      quiz_elements = element.user_quiz_elements
      classification = element.classification
      
      hash = {
        id: element.id,
        name: element.name,
        symbol: element.symbol,
        atomicNumber: element.atomicNumber, 
        meltingPoint: element.meltingPoint,
        boilingPoint: element.boilingPoint,
        electronegativity: element.electronegativity,
        atomicWeight: element.atomicWeight,
        classification_id: element.classification_id,
        classification_name: classification.name,
        classification_description: classification.description,
        selected: quiz_elements.map{|uqe| uqe.user.id}.include?(user_id)
      }

      if quiz_elements.find_by(user_id: user_id)
        hash[:user_quiz_element_id] = quiz_elements.find_by(user_id: user_id).id
      end

      hash

    end
  end

end
