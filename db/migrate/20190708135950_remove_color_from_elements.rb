class RemoveColorFromElements < ActiveRecord::Migration[5.2]
  def change
    remove_column :elements, :color, :string
  end
end
