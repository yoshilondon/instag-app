require 'rails_helper'

RSpec.describe Article, type: :model do
  let!(:user) do
    User.create!({
      email: 'test@example.com',
      password: 'password'
    })
  end

  context '記事コンテンツが入力されている場合' do
    let!(:article) do
      user.articles.build({
        content: Faker::Lorem.characters(number: 100)
      })
    end
    # before do
    #   user = User.create!({
    #     email: 'test@example.com',
    #     password: 'password'
    #   })
    #   @article = user.articles.build({
    #     content: Faker::Lorem.characters(number: 100)
    #   })
    # end

    it '記事を保存できる' do
      expect(article).to be_valid
    end
  end

  context '記事の文字が一文字の場合' do
    let!(:article) do
      user.articles.create({
        content: Faker::Lorem.characters(number: 1)
      })
    end
    
    it '記事を保存できない' do
      expect(article.errors.messages[:content][0]).to eq('is too short (minimum is 2 characters)')
    end
  end
end
