class AddAtomicWeightToElements < ActiveRecord::Migration[5.2]
  def change
    add_column :elements, :atomicWeight, :float
  end
end
