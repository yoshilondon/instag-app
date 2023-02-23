class ArticlesController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    @articles = Article.all
  end

  def show
  end

  def new
    @article = Article.new
  end
  
end