class Rectangle {
    constructor(height, width) {
      this.name = 'Rectangle';
      this.height = height;
      this.width = width;
    }
    sayName() {
      console.log('Hi, I am a ', this.name + '.');
    }
    get area() {
      return this.height * this.width;
    }
    set area(value) {
      this._area = value;
    }
  }
  
  class Square extends Rectangle {
    constructor(length) {
    super(length, length);
    //   this.height;
    //   this.name = 'Square';
  
      // Note: In derived classes, super() must be called before you
      // can use 'this'. Leaving this out will cause a reference error.
    }
  }

  const q1=new Square(20);

  console.log(q1);