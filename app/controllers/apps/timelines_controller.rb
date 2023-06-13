class Apps::TimelinesController < Apps::ApplicationController
  # 自分が投稿した記事で「いいね」が多い順に５件表示
  def index
    @articles = Article.joins(:likes)
                       .where('articles.user_id = ?', current_user.id)
                       .where('likes.created_at >= ?', 24.hours.ago)
                       .group('articles.id')
                       .order('COUNT(likes.id) DESC')
                       .limit(5)
  end

  # 自分がフォローしているユーザーの記事一覧を全て取得する→取得した値をshowで描画する
  def show
    user_ids = current_user.followings.pluck(:id)
    @articles = Article.where(user_id: user_ids)
  end
end
