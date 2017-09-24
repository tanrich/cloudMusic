function Father() {
	this.color = ['black','white'];
}
Father.prototype.common = [1, 2, 3];
function Son () {
	Father.call(this);
}
// Son.prototype = new Father();
var s1 = new Son();
var s2 = new Son();

s1.color.push('yellow');
// s1.common.push(4)
console.log(s1.color);
console.log(s2.color);
// console.log(s1.common);
// console.log(s2.common);