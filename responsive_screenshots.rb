require 'optparse'
require 'ostruct'
require 'time'


options = OpenStruct.new

OptionParser.new do |opts|
  opts.banner = "Usage: responsive_screenshot.rb [base-url] [subpages] \nExample: ruby responsive_screenshots.rb http://192.168.1.36:4567/ apps.html contact.html features.html feedback.html imprint.html privacy.html team.html tour.html"
  opts.on_tail("-h", "--help", "Show this message") do
      puts opts
      exit
  end
end.parse!

if options.update
  puts "updating"
  exec("curl -L #{scriptSource}?$(date +%s) -o #{File.basename($0)}")
end


url = ARGV[0]
subpages = [""]

subpages = subpages + ARGV[1..-1]

widths = {:w320_iPhone_5_portrait => 320,
          :w586_iPhone_5_landscape => 586,
          :w375_iPhone_6_portrait => 375,
          :w667_iPhone_6_landscape => 667,
          :w786_iPad_portrait => 786,
          :w1024_iPad_landscape => 1024,
          :w834_iPad_Pro_portrait => 834,
          :w1112_iPad_Pro_landscape => 1112,
          :w1024_iPad_Pro_13_portrait => 1024,
          :w1366_iPad_Pro_13_landscape => 1366,
          :w1920_Web => 1920,
          :w1366_Web => 1366}

$timestamp = DateTime.now.strftime("%Y-%d-%m-") + Time.now.to_i.to_s

if ARGV.empty?
  puts "Missing arguments. See: ruby responsive_screenshots.rb --help"
else
  for device in widths.keys
    if subpages
      for page in subpages
        system("webkit2png -W #{widths[device]} --scale=1 -F --dir=responsive_screenshots/#{$timestamp}/#{page}/ --filename=#{device} #{url}#{page}")
      end
    end
    system("webkit2png -W #{widths[device]} --scale=1 -F --dir=responsive_screenshots/#{$timestamp} --filename=#{device} #{url}")
  end
end
