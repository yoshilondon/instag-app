class TimelinesController < ApplicationController
  before_action :authenticate_user!

  # 自分がフォローしているユーザーの記事一覧を全て取得する→取得した値をshowで描画する
  def show
    user_ids = current_user.followings.pluck(:id)
    @articles = Article.where(user_id: user_ids)
  end
end