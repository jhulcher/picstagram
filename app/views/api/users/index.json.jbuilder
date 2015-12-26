
  json.array! @users do |user|
    json.user_since user.created_at.strftime("%b %d, %Y")

    json.username user.username
    json.id user.id
  end
