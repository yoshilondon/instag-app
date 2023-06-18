FactoryBot.define do
  factory :profile do
    accountname { Faker::Name.name }
  end
end
