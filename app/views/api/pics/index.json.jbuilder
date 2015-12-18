json.array! @pics do |pic|

  json.partial! 'pic', pic: pic 

end
