class UserSerializer < ActiveModel::Serializer
  attributes :id, :display_name

  has_one :profile, serializer: ProfileSerializer
end
