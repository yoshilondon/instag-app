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

  def create
    @article = Article.new(article_params)
    if @article.save
      redirect_to article_path(@article), notice: 'Saved!'
    else
      flash.now[:error] = 'Save failed....'
      render :new
    end
  end

  private
  def article_params
    params.require(:article).permit(:title, :content)
  end
end