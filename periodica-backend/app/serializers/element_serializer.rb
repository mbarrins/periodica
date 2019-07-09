class ElementSerializer < ActiveModel::Serializer
  attributes :id, :name, :symbol, :atomicNumber, 
      :meltingPoint, :boilingPoint, :electronegativity, 
      :atomicWeight, :classification_id


  attribute :classification_description do
    self.object.classification.description
  end

  attribute :selected do
    self.object.user_quiz_elements.map{|uqe| uqe.user.id}.include?(@instance_options[:user_id].to_i)
  end

end
