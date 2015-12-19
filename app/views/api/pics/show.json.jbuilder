  json.id @pic.id
  json.public_id @pic.public_id
  json.user_id @pic.user_id
  json.username @pic.user.username
  json.created_at time_ago_in_words(@pic.created_at) + " ago"
