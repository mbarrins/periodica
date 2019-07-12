class AmendColumnsQuestions < ActiveRecord::Migration[5.2]
  def change
    remove_column :questions, :quiz_field, :string
    add_reference :questions, :subject, index: true, foreign_key: true
  end
end
