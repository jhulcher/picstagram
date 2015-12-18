json.extract!(pic, :id, :public_id, :user_id)
json.username pic.user.username
json.created_at time_ago_in_words(pic.created_at) + " ago"
