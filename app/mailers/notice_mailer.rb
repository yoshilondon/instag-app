class NoticeMailer < ApplicationMailer
  def new_comment(user)
    @user = user
    mail to: user.email, subject: '【お知らせ】コメントがありました'
  end
end