class ProfileSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :avatar_url

  def avatar_url
   object.avatar.attached? ? url_for(object.avatar) : nil
  end

  belongs_to :user
end
