User = require './me'

me = 
  firstName: 'Jason'
  lastName: 'Voigt'
  tags: ['misanthropist', 'chicago']
  
user = new User(me)

showStatus = -> 
  status = if @isActive then 'active' else 'inactive'
  console.log "#{@fullName}'s status is #{status}"

user.on('change:isActive', showStatus)

user.on('change:tags', -> console.log "tags are now #{@tags.join(', ')}")

console.log user.firstName
console.log user.fullName
console.log user.initials
user.isActive = true
user.isActive = false

user.tags = user.tags.concat('nerd')
