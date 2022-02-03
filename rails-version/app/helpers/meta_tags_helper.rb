# frozen_string_literal: true

module MetaTagsHelper
  # rubocop:disable Metrics/MethodLength
  def default_meta_tags
    {
      site: 'ゴロゴロ円周率',
      reverse: true,
      charset: 'utf-8',
      description: 'ゴロ合わせのゲームで円周率を覚えよう！',
      keywords: '円周率, ゲーム, ゴロ, 語呂, 暗記, 覚える',
      viewport: 'width=device-width, initial-scale=1.0',
      og: {
        title: :title,
        type: 'website',
        site_name: 'ゴロゴロ円周率',
        description: :description,
        image: 'http://gorogoropanda.com/ogp/ogp.png',
        url: 'http://gorogoropanda.com'
      },
      twitter: {
        card: 'summary',
        site: '@unstoppa61e',
        description: :description,
        image: 'http://gorogoropanda.com/ogp/ogp.png',
        domain: 'http://gorogoropanda.com'
      }
    }
  end
  # rubocop:enable Metrics/MethodLength
end
