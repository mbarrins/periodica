class RemoveAtomicMassFromElements < ActiveRecord::Migration[5.2]
  def change
    remove_column :elements, :atomicMass, :float
  end
end
