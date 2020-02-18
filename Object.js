function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function () {
    console.log(this.name + 'abc')
}
class Dog extends Animal {
    speak(){
        console.log(this.name + 'bark');
    }
}


var d = new Dog('Mitzie ');
d.speak();