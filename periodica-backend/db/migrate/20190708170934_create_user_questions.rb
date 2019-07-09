class CreateUserQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :user_questions do |t|
      t.references :user, foreign_key: true
      t.references :question, foreign_key: true

      t.timestamps
    end
  end
end
