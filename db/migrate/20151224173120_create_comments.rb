class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.integer :pic_id, null: false
      t.string :body, null: false, :limit => 50
      t.timestamps null: false
    end
    add_index :comments, :pic_id
  end
end
