# frozen_string_literal: true

module MetaTagsHelper
  # rubocop:disable Metrics/MethodLength
  def default_meta_tags
    {
      reverse: true,
      charset: 'utf-8',
      keywords: '円周率, ゲーム, ゴロ, 語呂, 暗記, 覚える',
      viewport: 'width=device-width, initial-scale=1.0',
      og: {
      },
      twitter: {
        description: :description,
        image: 'http://gorogoropanda.com/ogp/ogp.png',
      }
    }
  end
  # rubocop:enable Metrics/MethodLength
end
