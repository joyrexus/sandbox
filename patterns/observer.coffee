class PostOffice
    constructor: () ->
        @subscribers = []
    notifyNewItemReleased: (item) ->
        subscriber.callback(item) for subscriber in @subscribers when subscriber.item is item
    subscribe: (to, onNewItemReleased) ->
        @subscribers.push {'item':to, 'callback':onNewItemReleased}

class MagazineSubscriber
    onNewMagazine: (item) ->
        alert "I've got new "+item

class NewspaperSubscriber
    onNewNewspaper: (item) ->
        alert "I've got new "+item

postOffice = new PostOffice()
sub1 = new MagazineSubscriber()
sub2 = new NewspaperSubscriber()
postOffice.subscribe "Mens Health", sub1.onNewMagazine
postOffice.subscribe "Times", sub2.onNewNewspaper
postOffice.notifyNewItemReleased "Times"
postOffice.notifyNewItemReleased "Mens Health"
