class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class SelfOrganizedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insert(data) {       
         if(this.size() == 0) {
            this.head = new Node(data);
            this.tail = this.head;
        } else {
            var prevNode = this.tail;
            this.tail = new Node(data);
            prevNode.next = this.tail;
            this.tail.prev = prevNode;
        }  
        this.length++;
    }

    size() {
        return this.length;
    }

    at(index) {
        if(this.size() == 0 || this.size() <= index || index < 0) {
            return null;
        } else {
            var tempNode = this.head;
            while(index > 0) {
                tempNode = tempNode.next;
                index--;
            }
            return tempNode.data;
        }
    }

    findNode(data) {
        var tempNode = this.head;
        while(true) {
            if(tempNode == null) {
                return null;
            }

            if(data == tempNode.data) {
                return tempNode;
            } else {
                tempNode = tempNode.next;
            }
        }
    }

    toArray() {
        var array = [];
        if(this.size() == 0) {
            return array;
        }

        var tempNode = this.head;
        while(tempNode != null) {
            array.push(tempNode.data);
            tempNode = tempNode.next;
        }
        return array;
    }

    removeAt(index) {
        if(this.size == 0 || this.size() <= index || index < 0) {
            return null;
        } else {
            if(index == 0) {
                if(this.size() == 1) {
                    this.head = null;
                } else {
                    this.head = this.head.next;
                    this.head.prev = null;
                }
            } else if(index == this.size() - 1) {
                this.tail = this.tail.prev;
                this.tail.next = null;
            } else {
                var deleteNode = this.head;
                while(index > 0) {
                    deleteNode = deleteNode.next;
                    index--;
                }
                var tempPrevNode = deleteNode.prev;
                tempPrevNode.next = deleteNode.next;
                var tempNextNode = deleteNode.next;
                tempNextNode.prev = deleteNode.prev;
            }
        }
        this.length--;
    }

    moveToFront(node) {
        var movingNode;
        if((movingNode = this.findNode(node.data)) == null) {
            return null;
        }
         
        if(movingNode == this.head) {
            //do nothing
        } else {
            if(movingNode == this.tail) {
                var tempHeadNode = this.head;
                var tempTailNode = this.tail.prev;

                this.head = this.tail;
                this.head.prev = null;
                this.head.next = tempHeadNode;

                tempHeadNode.prev = this.head;

                this.tail = tempTailNode;
                this.tail.next = null;
            } else {
                var tempHeadNode = this.head;
                var tempPrevNode = movingNode.prev;
                var tempNextNode = movingNode.next;

                tempPrevNode.next = tempNextNode;
                tempNextNode.prev = tempPrevNode;

                this.head = movingNode;
                this.head.prev = null;
                this.head.next = tempHeadNode;
            }
        }

        return true;
    }

    reorganize(data) {
        var tempNode = this.findNode(data);
        if(tempNode == null) {
            return false;
        }

        if(this.moveToFront(tempNode) == null) {
            return false;
        } else {
            return true;
        }
    }

}

module.exports = {
    SelfOrganizedList,
    Node
};
