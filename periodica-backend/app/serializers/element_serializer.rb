class ElementSerializer < ActiveModel::Serializer
  attributes :id, :name, :symbol, :atomicNumber, 
      :meltingPoint, :boilingPoint, :electronegativity, 
      :atomicWeight, :classification_id

  def attributes(*args)
    hash = super
    
    classification = self.object.classification
    quiz_elements = self.object.user_quiz_elements

    hash[:classification_name] = classification.name
    hash[:classification_description] = classification.description
    hash[:selectec] = quiz_elements.map{|uqe| uqe.user.id}.include?(@instance_options[:user_id].to_i)

    if quiz_elements.find_by(user_id: @instance_options[:user_id].to_i)
      hash[:user_quiz_element_id] = quiz_elements.find_by(user_id: @instance_options[:user_id].to_i).id
    end

    hash
  end
end
