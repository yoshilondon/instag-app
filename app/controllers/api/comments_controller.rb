class Api::CommentsController < Api::ApplicationController
 
  def index
    article = Article.find(params[:article_id])
    comments = article.comments

    render json: comments, each_serializer: CommentSerializer, include: { user: [:profile] }
  end
  
  # def new
  #   article = Article.find(params[:article_id])
  #   @comment = article.comments.build
  # end

  def create
    article = Article.find(params[:article_id])
    @comment = article.comments.build(comment_params)
    @comment.user = current_user
    @comment.save!

    render json: @comment, each_serializer: CommentSerializer, include: { user: [:profile] }
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :avatar)
  end
end
