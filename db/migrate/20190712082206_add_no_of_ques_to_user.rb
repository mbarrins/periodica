class AddNoOfQuesToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :no_of_ques, :integer, :default => 10
  end
end
