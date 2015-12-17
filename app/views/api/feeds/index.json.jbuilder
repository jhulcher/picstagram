json.array! @followee_pics do |pic|

  json.user_id pic.user_id
  json.public_id pic.public_id
  json.created_at pic.created_at

end
