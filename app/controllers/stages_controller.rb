# frozen_string_literal: true

class StagesController < ApplicationController
  def show
    @id = params[:id]
  end
end
