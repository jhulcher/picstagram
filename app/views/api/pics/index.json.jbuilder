json.array! @pics do |pic|

  json.username pic.user.username
  json.user_id pic.user.id
  json.public_id pic.public_id
  json.pic_id pic.id
  json.created_at time_ago_in_words(pic.created_at) + " ago"

end
