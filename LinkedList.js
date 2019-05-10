function LinkedList() {
    this.head = null
    this.tail = null
}

function Node(value, next, prev) {
    this.value = value 
    this.next = next 
    this.prev = prev
}

LinkedList.prototype.addToTail = function(value) {
    const node = new Node(value, null, this.tail)
    node._tail = true
    if(this.tail) {
        delete(this.tail._tail)
        this.tail.next = node 
    }
    if(this.head === null) {
        this.head = node
    }
    this.tail = node
}

LinkedList.prototype.addToHead = function(value) {
    const node = new Node(value, this.head, null) 
    node._head = true
    if(this.head) {
        delete(this.head._head)
        this.head.prev = node
    }
    if(this.tail === null) {
        this.tail = node
    }
    this.head = node
}

LinkedList.prototype.removeTail = function() {
    if(!this.tail) return null 
    this.tail = this.tail.prev 
    if(this.tail) this.tail.next = null 
}

module.exports = LinkedList