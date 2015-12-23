# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.delete_all

u1 = User.create!(
  username: "jesse",
  password: "42131607"
)
u2 = User.create!(
  username: "don",
  password: "12345678"
)
u3 = User.create!(
  username: "rachael",
  password: "12345678"
)
u4 = User.create!(
  username: "malcom",
  password: "12345678"
)
u1.follows.create!(followed_id: u4.id)
u1.follows.create!(followed_id: u3.id)
u1.follows.create!(followed_id: u2.id)
u2.follows.create!(followed_id: u4.id)
u2.follows.create!(followed_id: u3.id)
u2.follows.create!(followed_id: u1.id)
u3.follows.create!(followed_id: u4.id)
u3.follows.create!(followed_id: u2.id)
u3.follows.create!(followed_id: u1.id)
u4.follows.create!(followed_id: u3.id)
u4.follows.create!(followed_id: u2.id)
u4.follows.create!(followed_id: u1.id)
Pic.create([{user_id: }{public_id: "http://res.cloudinary.com/picstagram/image/upload/c_lfill,g_center,h_500,q_81,r_0,w_500/jkwzwrj3ay8wm7tlfmim.jpg"}])
