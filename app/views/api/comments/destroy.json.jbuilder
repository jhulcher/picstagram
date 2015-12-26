json.user_since @comment.pic.user.created_at.strftime("%b %d, %Y")
json.id @comment.pic.id
json.public_id @comment.pic.public_id
json.user_id @comment.pic.user_id
json.username @comment.pic.user.username
json.created_at time_ago_in_words(@comment.pic.created_at) + " ago"
json.likes_count @comment.pic.likes.count
json.already_liked @comment.pic.likers.include?(current_user)

json.comments @comment.pic.comments.sort do |comment|
  json.author comment.author.username
  json.author_id comment.author.id
  json.id comment.id
  json.comment comment.body
end
