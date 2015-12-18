  #
  # json.user do
  #   json.username @user.username
  #   json.id @user.id
  # end
  #
  # json.pics do
    json.array! @user.pics do |pic|

      json.partial! 'api/pics/pic', pic: pic

    end
  # end
