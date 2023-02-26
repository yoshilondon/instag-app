class ArticlesController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    @articles = Article.all
  end

  def show
  end

  def new
    @article = current_user.articles.build
  end

  def create
    @article = current_user.articles.build(article_params)
    if @article.save
      redirect_to article_path(@article), notice: 'Saved!'
    else
      flash.now[:error] = 'Save failed....'
      render :new
    end
  end

  # def edit
  #   @article = current_user.articles.find(params[:id])
  # end

  private
  def article_params
    params.require(:article).permit(:content, images: [])
  end
end
