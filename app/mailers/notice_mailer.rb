class NoticeMailer < ApplicationMailer
  def new_comment(user, content, each_user, article)
    @comment_user = user
    @content = content
    @commented_user = each_user
    @article = article
    mail to: each_user.email, subject: '【お知らせ】新しいコメントがつきました'
  end
end
