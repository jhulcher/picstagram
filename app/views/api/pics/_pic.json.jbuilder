json.user_since pic.user.created_at.strftime("%b %d, %Y")
json.id pic.id
json.public_id pic.public_id
json.user_id pic.user_id
json.username pic.user.username
json.created_at time_ago_in_words(pic.created_at) + " ago"
json.likes_count pic.likes.count
json.already_liked pic.likers.include?(current_user)


json.comments pic.comments.sort do |comment|
  json.author comment.author.username
  json.author_id comment.author.id
  json.id comment.id
  json.comment comment.body
end
