# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Projects', type: :system do
  scenario 'ステージ選択画面でステージ1をクリックして、ステージ画面に移る' do
    visit root_path
    find('.panel', match: :first).click
    expect(page).to have_content 'ステージ'
  end
end
