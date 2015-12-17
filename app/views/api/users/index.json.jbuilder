json.array! @users do |user|

  json.username user.username
  json.id user.id

end

# json.array! @pics do |pic|
#
#   json.public_id pic.public_id
#   json.created_at pic.created_at
#
# end
