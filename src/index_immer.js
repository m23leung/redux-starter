import { produce } from 'immer';

let book = { title: "Harry Potter" };

// Using Immer. Modifying immutable object using mutable-like syntax
function publish(book) {
    return produce(book, draftBook => {
        draftBook.isPublished = true;
    })
}

book = publish(book);
console.log(book);