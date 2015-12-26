json.array! @followee_pics do |pic|

  json.user_since pic.user.created_at.strftime("%b %d, %Y")
  json.id pic.id
  json.public_id pic.public_id
  json.user_id pic.user_id
  json.username pic.user.username
  json.created_at time_ago_in_words(pic.created_at) + " ago"
  json.likes_count pic.likes.count
  json.already_liked pic.likers.include?(current_user)


    json.partial! 'api/pics/pic', pic: pic

end
