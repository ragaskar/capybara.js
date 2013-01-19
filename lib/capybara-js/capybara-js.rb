module CapybaraJS
  class Railtie < Rails::Railtie
    initializer :append_assets_path, :group => :all do |app|
      app.config.assets.paths.unshift(File.join(File.dirname(__FILE__), '..', '..', 'vendor', 'assets', 'javascripts'))
    end
  end
end

