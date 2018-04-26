//require("./primes.js");
require("./triangles.js");
/*const FS = require("fs");
var squarelist = [];
function testSquare(n) //test if given number is a perfect square
{
    for(var i = 0; i < squarelist.length; i++)
    {
        if(n == squarelist[i])
        {
            return i;
        }
    }
    return -1;
}
var times = 1000;
for(var i = 1; i <= times; i++)
{
    var a = i * i;
    squarelist.push(a);
    for(var j = 0; j < i; j++)
    {
        var b = j * j;
        var sqr = testSquare((a + b) / 2);
        if(sqr > 0)
        {
            var out = "(" + i + ", " + j + "): " + a + " " + b + " -> " + squarelist[sqr];
            console.log(out);
            FS.appendFile("results.txt", out + "\n", function(err)
            {
                if(err)
                {
                    console.log("failed to write " + i + ", " + j); 
                }
            });
        }
    }
}*/