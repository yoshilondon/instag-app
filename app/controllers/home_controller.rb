class HomeController < ApplicationController

  def index
    @title = 'Yoshiki'
    render 'home/index'
  end

  def about
  end
end