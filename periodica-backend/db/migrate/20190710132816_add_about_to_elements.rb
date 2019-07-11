class AddAboutToElements < ActiveRecord::Migration[5.2]
  def change
    add_column :elements, :about, :string
  end
end
