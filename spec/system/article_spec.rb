require 'rails_helper'

RSpec.describe 'Article', type: :system do
  let!(:user) { create(:user) }
  let!(:articles) { create_list(:article, 3, user: user) }

  it '記事一覧が表示される' do
    visit root_path
    articles.each do |article|
      expect(page).to have_css('.card_caption', text: article.author_name)
    end
  end

  it '記事詳細を表示できる' do
    visit root_path

    article = articles.first
    click_on article.content

    expect(page).to have_css('.card_content_caption', text: article.author_name)
    expect(page).to have_css('.card_content_caption', text: article.content)
  end
end
