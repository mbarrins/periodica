class CreateElements < ActiveRecord::Migration[5.2]
  def change
    create_table :elements do |t|
      t.string :name
      t.string :symbol
      t.integer :atomicNumber
      t.float :atomicMass
      t.references :classification, foreign_key: true
      t.string :color
      t.float :meltingPoint
      t.float :boilingPoint
      t.float :electronegativity
      t.integer :discovered

      t.timestamps
    end
  end
end
