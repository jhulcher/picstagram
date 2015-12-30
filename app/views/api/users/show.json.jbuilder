  if @user.pics.length == 0
    json.user_since @user.created_at.strftime("%b %d, %Y")

    json.user_id @user.id
    json.username @user.username
  else
    json.array! @user.pics.sort.reverse do |pic|
      json.user_since pic.user.created_at.strftime("%b %d, %Y")
      json.partial! 'api/pics/pic', pic: pic

    end
  end
