import { Map } from 'immutable';

let book = Map ({ title: "Harry Potter" });

function publish(book) {
    //book.isPublished = true;
    return book.set("isPublished", true);

}

book = publish(book);

console.log(book.get('title'));

console.log(book.toJS());   
