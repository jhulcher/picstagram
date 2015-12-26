json.user_since @like.pic.user.created_at.strftime("%b %d, %Y")
json.id @like.pic.id
json.public_id @like.pic.public_id
json.user_id @like.pic.user_id
json.username @like.pic.user.username
json.created_at time_ago_in_words(@like.pic.created_at) + " ago"
json.likes_count @like.pic.likes.count
json.already_liked @like.pic.likers.include?(current_user)

json.comments @like.pic.comments.sort do |comment|
  json.author comment.author.username
  json.author_id comment.author.id
  json.id comment.id
  json.comment comment.body
end
