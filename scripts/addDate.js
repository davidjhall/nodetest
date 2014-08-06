var myArray = []
for ( var i = 199;  i< 205; i++)
{
var myDate = new Date('2014-01-01');
myArray.push(new Date(myDate.setDate(myDate.getDate()+i )));
}
console.log(myArray);

 



