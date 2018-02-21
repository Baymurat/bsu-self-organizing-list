const {SelfOrganizedList, Node} = require('../src/self-organized-list');

describe('SelfOrganizedList', () => {
    let sol = null;

    // NOTE: Each test case (it) uses new SelfOrganizedList instance
    beforeEach(() => {
        sol = new SelfOrganizedList();
    });

    describe('#constructor', () => {
        it('list should be empty', () => {
            expect(sol.head).to.equal(null);
            expect(sol.tail).to.equal(null);
        })
    });

    describe('#insert', () => {
        it('should assign data to the head if list is empty', () => {
            sol.insert('Game of thrones');

            expect(sol.head).to.be.an.instanceOf(Node);
            expect(sol.tail).to.equal(sol.head);
            expect(sol.head.data).to.equal('Game of thrones');
            expect(sol.tail.data).to.equal('Game of thrones');
        });

        it('should insert new data to the end of the list', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            expect(sol.head.data).to.equal('Game of thrones');
            expect(sol.head.next.data).to.equal('Supernatural');
            expect(sol.tail.data).to.equal('Breaking Bad');

        });

        it('next element of the new node should be null', () => {
            sol.insert('Game of thrones');

            expect(sol.head.next).to.equal(null);

            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            expect(sol.tail.next).to.equal(null);
        });

        it('prev element of the new node should be prev tail', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');

            expect(sol.tail.prev.data).to.equal('Game of thrones');
        });
    });

    describe('#size', () => {
        it('should be 0 for an empty list', () => {
            expect(sol.size()).to.equal(0);
        });

        it('should be correct after insertion', () => {
            sol.insert(1);
            sol.insert(2);

            expect(sol.size()).to.equal(2);

            sol.insert(3);

            expect(sol.size()).to.equal(3);
        });

        it('should be correct after reorganization', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            sol.reorganize('Breaking Bad');

            expect(sol.size()).to.equal(3);
        });

        it('should be correct after removing', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            expect(sol.size()).to.equal(3);

            sol.removeAt(0);

            expect(sol.size()).to.equal(2);
        });
    });

    describe('#at', () => {
        it('should return null if list is empty', () => {
            expect(sol.at(0)).to.equal(null);
            expect(sol.at(999)).to.equal(null);
        });

        it('should return correct elements', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            expect(sol.at(2)).to.equal('Breaking Bad');
            expect(sol.at(0)).to.equal('Game of thrones');
            expect(sol.at(1)).to.equal('Supernatural');            

            expect(sol.at(999)).to.equal(null);
        });
    });

    describe('#findNode', () => {
        it('should return instance of Node', () => {
            sol.insert('Game of thrones');

            expect(sol.findNode('Game of thrones')).to.be.an.instanceOf(Node);
        });

        it('should return null if node doesn\'t exist', () => {
            sol.insert('Game of thrones');

            expect(sol.findNode('Game of gnomes')).to.equal(null);
        });

        it('should return correct nodes', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            const node1 = sol.findNode('Game of thrones');
            const node2 = sol.findNode('Supernatural');
            const node3 = sol.findNode('Breaking Bad');

            expect(node1).to.equal(sol.head);
            expect(node1.next).to.equal(node2);
            expect(node3).to.equal(sol.tail);
        });
    });

    describe('#toArray', () => {
        it('should return empty array for empty list', () => {
           expect(sol.toArray()).to.deep.equal([]);
        });

        it('should return array of elements', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            expect(sol.toArray()).to.deep.equal(['Game of thrones', 'Supernatural', 'Breaking Bad']);
        });
    });

    describe('#moveToFront', () => {
        it('should move node to the head of the list', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            sol.moveToFront(sol.head.next);

            expect(sol.head.data).to.equal('Supernatural');
        });

        it('should work correctly for list with size === 1', () => {
            sol.insert('Game of thrones');

            sol.moveToFront(sol.head);
            expect(sol.head.data).to.equal('Game of thrones');
            expect(sol.head.prev).to.equal(null);
            expect(sol.tail).to.equal(sol.head);

        });

        it('should update positions of the other nodes', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            sol.moveToFront(sol.head.next);

            expect(sol.head.next.data).to.equal('Game of thrones');
            expect(sol.tail.data).to.equal('Breaking Bad');
            expect(sol.head.next.next.data).to.equal('Breaking Bad');
        });
    });

    describe('#removeAt', () => {
        it('should work correctly for list with size === 1', () => {
            sol.insert('Game of thrones');

            sol.removeAt(0);
            expect(sol.size()).to.equal(0)
        });

        it('should correctly remove head and tail', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            sol.removeAt(0);

            expect(sol.head.data).to.equal('Supernatural');
            expect(sol.head.prev).to.equal(null);
            expect(sol.head.next.data).to.equal('Breaking Bad');
            expect(sol.size()).to.equal(2);

            sol.removeAt(1);

            expect(sol.head.data).to.equal('Supernatural');
            expect(sol.head.prev).to.equal(null);
            expect(sol.tail.data).to.equal('Supernatural');

        });

        it('should correctly remove elements', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            sol.removeAt(1);

            expect(sol.head.data).to.equal('Game of thrones');
            expect(sol.head.next).to.equal(sol.tail);

        });

        //added
        it('return null if index < 0 or size <= index', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');

            expect(sol.removeAt(2)).to.equal(null);
            expect(sol.removeAt(-2)).to.equal(null);
        });
    });

    describe('#reorganize', () => {
        it('should work correctly for list with size === 1 and 0', () => {
            sol.reorganize('Game of thrones');

            expect(sol.head).to.equal(null);

            sol.insert('Game of thrones');

            sol.reorganize('Game of thrones');
            expect(sol.head).to.equal(sol.tail);
            expect(sol.tail.next).to.equal(null);
        });

        it('should move node to the head of the list', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            sol.reorganize('Breaking Bad');

            expect(sol.head.data).to.equal('Breaking Bad');
            expect(sol.tail.prev.data).to.equal('Game of thrones');
            expect(sol.tail.data).to.equal('Supernatural');

            sol.reorganize('Game of thrones');
            
            expect(sol.head.data).to.equal('Game of thrones');
            expect(sol.tail.prev.data).to.equal('Breaking Bad');
            expect(sol.tail.data).to.equal('Supernatural');
        });

        it('should return true if list has a node with data', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            sol.reorganize('Breaking Bad');

            expect(sol.reorganize('Breaking Bad')).to.equal(true);
            expect(sol.reorganize('Breaking Bad')).to.equal(true);
            expect(sol.reorganize('Supernatural')).to.equal(true);
        });

        it('should return false if list doesn\'t have a node with data', () => {
            sol.insert('Game of thrones');
            sol.insert('Supernatural');
            sol.insert('Breaking Bad');

            expect(sol.reorganize('Game of gnomes')).to.equal(false);
            expect(sol.reorganize('Superficial')).to.equal(false);
            expect(sol.reorganize('Breaking good')).to.equal(false);
        });

    });
});

