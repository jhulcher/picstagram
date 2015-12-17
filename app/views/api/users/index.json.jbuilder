json.array! @users do |user|

  json.id user.id
  json.username user.username

end

# json.array! @pics do |pic|
#
#   json.public_id pic.public_id
#   json.created_at pic.created_at
#
# end
