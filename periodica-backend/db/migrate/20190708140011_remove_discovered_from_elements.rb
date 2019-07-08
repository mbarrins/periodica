class RemoveDiscoveredFromElements < ActiveRecord::Migration[5.2]
  def change
    remove_column :elements, :discovered, :integer
  end
end
