class CreatePics < ActiveRecord::Migration
  def change
    create_table :pics do |t|
      t.integer :user_id, null: false
      t.string :public_id, null: false
      t.timestamps null: false
    end
    add_index :pics, :user_id
  end
end
