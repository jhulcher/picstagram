json.user do
  json.username @user.username
end

json.pics do
  json.array! @user.pics do |pic|

    json.public_id pic.public_id
    json.pic_id pic.id
    json.created_at time_ago_in_words(pic.created_at) + " ago"

  end
end
