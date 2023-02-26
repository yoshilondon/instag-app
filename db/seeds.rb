# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

john = User.create!(email: 'john@example.com', password: 'password')
emily = User.create!(email: 'emily@example.com', password: 'password')

3.times do
  john.articles.create!(
    content: Faker::Lorem.sentence(word_count: 30)
  )
end

3.times do
  emily.articles.create!(
    content: Faker::Lorem.sentence(word_count: 30)
  )
end
