class AddImgurlToElements < ActiveRecord::Migration[5.2]
  def change
    add_column :elements, :imgurl, :string
  end
end
