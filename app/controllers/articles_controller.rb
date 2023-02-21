class ArticlesController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    @article = Article.first
  end
end