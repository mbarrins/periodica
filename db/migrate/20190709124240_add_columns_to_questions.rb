class AddColumnsToQuestions < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :quiz_field, :string
    add_column :questions, :question_field, :string
    add_column :questions, :answer_field, :string
  end
end
