class ElementSerializer < ActiveModel::Serializer
  attributes :id, :name, :symbol, :atomicNumber, 
      :meltingPoint, :boilingPoint, :electronegativity, 
      :atomicWeight, :classification_id

  def attributes(*args)
    hash = super

    if self.object.user_quiz_elements.find_by(user_id: @instance_options[:user_id].to_i)
      hash[:user_quiz_element_id] = self.object.user_quiz_elements.find_by(user_id: @instance_options[:user_id].to_i).id
    end

    hash
  end

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
