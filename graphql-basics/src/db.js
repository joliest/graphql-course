const users  = [{
    id: '1',
    name: 'Joli',
    email: 'joli@example.com',
    age: 27
}, {
    id: '2',
    name: 'Je',
    email: 'je@example.com',
    age: 29
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
    age: 30
}]

const posts  = [{
    id: '1',
    title: 'My Post',
    body: 'Lorem ipsum chena',
    published: false,
    author: '1',
}, {
    id: '2',
    title: 'Joli Post',
    body: 'Test 123',
    published: true,
    author: '1',
}, {
    id: '3',
    title: 'Je Post',
    body: 'Hello',
    published: false,
    author: '2',
}]

const comments = [{
    id: '1',
    text: 'comment 1',
    author: '1',
    post: '1',
}, {
    id: '2',
    text: 'comment 2',
    author: '2',
    post: '1',
}, {
    id: '3',
    text: 'comment 3',
    author: '2',
    post: '2',  
}, {
    id: '4',
    text: 'comment 4',
    author: '3',
    post: '3',
}]

const db = {
    users,
    posts,
    comments,
};

export default db;