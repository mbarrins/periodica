class CreateQuizQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :quiz_questions do |t|
      t.references :quiz, foreign_key: true
      t.references :question, foreign_key: true
      t.string :user_answer
      t.string :correct_answer
      t.boolean :result

      t.timestamps
    end
  end
end
