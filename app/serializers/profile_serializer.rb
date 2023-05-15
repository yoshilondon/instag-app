# == Schema Information
#
# Table name: profiles
#
#  id          :bigint           not null, primary key
#  accountname :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_profiles_on_user_id  (user_id)
#
class ProfileSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :avatar_url

  def avatar_url
   object.avatar.attached? ? url_for(object.avatar) : nil
  end

  belongs_to :user
end
