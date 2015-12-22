  if @user.pics.length == 0

    json.user_id @user.id
    json.username @user.username
  else
    json.array! @user.pics.reverse do |pic|

      json.partial! 'api/pics/pic', pic: pic

    end
  end
