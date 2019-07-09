class AddColumnsToQuizQuestions < ActiveRecord::Migration[5.2]
  def change
    add_reference :quiz_questions, :element, foreign_key: true
    add_column :quiz_questions, :question_string, :string
  end
end
