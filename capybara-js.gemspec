# -*- encoding: utf-8 -*-
require File.expand_path('../lib/capybara-js/version', __FILE__)

Gem::Specification.new do |s|
  s.name        = "capybara-js"
  s.version     = CapybaraJS::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Rajan Agaskar"]
  s.email       = ["ragaskar@gmail.com"]
  s.homepage    = "http://github.com/ragaskar/capybara.js"
  s.summary     = "Capybara 'port' to Javascript"
  s.description     = "Capybara 'port' to Javascript"
  s.license = "MIT"

  s.files        = ['lib/capybara-js.rb',
                    'lib/capybara-js/capybara-js.rb',
                    'lib/capybara-js/version.rb',
                    'vendor/assets/javascripts/capybara.js']
  # s.executables  = `git ls-files -- bin/*`.split("\n").map { |f| File.basename(f) }
  s.require_path = 'lib'
  s.add_dependency "jquery-rails"
end


