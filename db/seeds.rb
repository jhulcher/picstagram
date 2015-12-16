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
  password: "12345678"
)
u2 = User.create!(
  username: "jimbo",
  password: "12345678"
)
u3 = User.create!(
  username: "sally",
  password: "12345678"
)
u4 = User.create!(
  username: "tina",
  password: "12345678"
)
u5 = User.create!(
  username: "rachael",
  password: "12345678"
)
u1.follows.create!(followed_id: u5.id)
u1.follows.create!(followed_id: u3.id)
u5.follows.create!(followed_id: u1.id)
u5.follows.create!(followed_id: u4.id)
