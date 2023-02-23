class ArticlesController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    @articles = Article.all
  end

  def show
  end
  
end