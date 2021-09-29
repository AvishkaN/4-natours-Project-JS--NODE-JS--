class car{
    constructor(){
        this.namee='toyota';
        this.age=2020;

    }
    print(){
        console.log(this)
        return this;
    }
    print2(){
        console.log(this);
        console.log(this.age)
    }
}
const vehicle=new car();
vehicle.print().print2();