class AmendColumnsUserQuestions < ActiveRecord::Migration[5.2]
  def change
    remove_reference :user_questions, :question, index: true, foreign_key: true
    add_reference :user_questions, :subject, index: true, foreign_key: true
  end
end
