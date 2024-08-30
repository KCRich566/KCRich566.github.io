module Jekyll
  module TranslateFilter
    def translate(input)
      site = @context.registers[:site]
      lang = @context.environments.first['page']['language'] || 'en'
      translations = site.data[lang] || {}
      translations[input] || input
    end
  end
end

Liquid::Template.register_filter(Jekyll::TranslateFilter)
