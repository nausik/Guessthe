//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
if (Array.prototype.shuffle === undefined){
    Array.prototype.shuffle = function(){
       var new_arr = this.slice(0);
	   for (var j, x, i = new_arr.length; i; j = Math.floor(Math.random() * i), x = new_arr[--i], new_arr[i] = new_arr[j], new_arr[j] = x);
       return new_arr;
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

String.prototype.trimToLength = function(m) {
  return (this.length > m) 
    ? jQuery.trim(this).substring(0, m).split(" ").slice(0, -1).join(" ") + "..."
    : this;
};