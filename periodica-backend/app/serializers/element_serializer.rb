class ElementSerializer < ActiveModel::Serializer
  attributes :id, :imgurl, :name, :symbol, :atomicNumber, :about, 
      :meltingPoint, :boilingPoint, :electronegativity, 
      :atomicWeight, :classification_id

  attribute :classification_name do
    self.object.classification.name
  end

  attribute :classification_description do
    self.object.classification.description
  end

  attribute :selected do
    self.object.user_quiz_elements.map{|uqe| uqe.user.id}.include?(@instance_options[:user_id].to_i)
  end

end
