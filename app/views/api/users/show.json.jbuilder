  #
  # json.user do
  #   json.username @user.username
  #   json.id @user.id
  # end
  #
  # json.pics do
  if @user.pics.length == 0

    json.user_id @user.id
    json.username @user.username
  else
    json.array! @user.pics do |pic|

      json.partial! 'api/pics/pic', pic: pic

    end
  end
  # end
