export class Cache<T> 
{
    value: T; 
    time: String = new Date().toJSON(); 
    constructor(value: T) {
         this.value = value; 
    }
}