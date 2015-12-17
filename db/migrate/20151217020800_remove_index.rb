class RemoveIndex < ActiveRecord::Migration
  def up
    add_index :follows, [:follower_id, :followed_id], unique: true
  end
  def down
    remove_index(:follows, :name => "index_follows_on_follower_id_and_followed_id")
  end
end
