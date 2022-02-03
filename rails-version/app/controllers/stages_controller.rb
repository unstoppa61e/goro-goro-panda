# frozen_string_literal: true

class StagesController < ApplicationController
  def index; end

  def show
    @id = params[:id]
  end
end
