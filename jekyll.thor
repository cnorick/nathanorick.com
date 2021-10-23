# $ thor jekyll:new The title of the new post --editor=vim

require "stringex"
require 'date'

class Jekyll < Thor
  desc "new", "create a new post"
  method_option :editor, :default => "code"
  option :publishDay, :default => "Monday"

  def new(*title)
    title = title.join(" ")
    date = Date.parse(options[:publishDay])
    delta = date > Date.today ? 0 : 7
    date = date + delta
    date = date.strftime('%Y-%m-%d')

    filename = "_posts/#{date}-#{title.to_url}.markdown"

    if File.exist?(filename)
      abort("#{filename} already exists!")
    end

    puts "Creating new post: #{filename}"
    open(filename, 'w') do |post|
      post.puts "---"
      # post.puts "layout: post"
      post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
      post.puts "tags:"
      post.puts " -"
      post.puts "image:"
      post.puts "draft: true"
      post.puts "---"
    end

    system(options[:editor], filename)
  end
end