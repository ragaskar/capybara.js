namespace :build do
  task :release do
    system('rake assets:precompile')
    system('cp ./public/assets/capybara.js ./vendor/assets/javascripts/')
    system('rm -rf public/assets')
  end
end

desc "Build Capybara.js release"
task :build => "build:release"
