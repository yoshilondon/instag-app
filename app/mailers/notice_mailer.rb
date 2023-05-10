class NoticeMailer < ApplicationMailer
  def new_comment(user, content, article)
    @user = user
    @content = content
    @article = article
    mail to: user.email, subject: '【お知らせ】新しいコメントがつきました'
  end
end
