class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
    insert(n){
        if (this.next == null) {
            this.next = n;
          } else {
            this.next.prev = this;
            this.next.insert(n);
          }
     }
     moveToFront(node) {
        
     }
     at(index) {
        if(index === 0) {
            return this.data;
        } else {
            return this.next.at(--index);
        }
     }
     findNode(data) {
         if(data === this.data) {
             return this
         } else if(this.next === null) {
             return null
         } else {
             return this.next.findNode(data)
         }
     }
     removeAt(index) {
        if(index === 0) {
            this.prev = null;
        } else {
            this.next.removeAt(index--)
        }
     }
  }
  
  class SelfOrganizedList {
    constructor() {
        this.head = null;
        this.tail = null;
  
        this.count = 0;
        this.root = null;
        this.countFind = 0;
        this.arr = [];
        this.arrCopy = [];
        
    }
  
    insert(data) {
        this.arr.push(data);
        var n = new Node(data);
        if (this.head == null) {
            this.head = n;
            this.tail = this.head;
        } else {
            this.head.insert(n);
            this.tail = n;
            this.tail.prev = this.head;
        }
        this.count++;
    }
  
    size() {
        return this.count;
    }
  
    at(index) {
        if(this.count === 0) {
            return null;
        } else if(this.count < index) {
            return null;
        }
        return this.head.at(index--);
    }
  
    findNode(data) {
        return this.head.findNode(data);
    }
  
    toArray() {
        return this.arr;
    }
  
    removeAt(index) {
        this.count--;
        this.head.removeAt(index);
    }
  
    moveToFront(node) {
        if (this.count === 1) {
            return node.data;
        } 
        node.prev.data = node.data;
    }
  
    reorganize(data) {
        if(this.count === 0) {
            return null;
        }

        if (!this.head.findNode(data)) {
            return false;
        } else if(this.head.findNode(data)) {
            return true;
        }
    }
  
  }


module.exports = {
    SelfOrganizedList,
    Node
};
