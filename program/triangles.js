const FS = require("fs");
var numlist = [];
var copiedlist = [];
function test(n) //test if given number is a perfect square
{
    for(var i = 0; i < numlist.length; i++)
    {
        if(n == numlist[i])
        {
            return i;
        }
    }
    return -1;
}
function findAndRemove(val)
{
    for(var i = 0; i < copiedlist.length; i++)
    {
        if(copiedlist[i] == val)
        {
            copiedlist.splice(i, 1);
            continue;
        }
        if(val > copiedlist[i])
        {
            break;
        }
    }
}
var str = "";
FS.readFile("./triangles.txt", "utf8", function(err, data)
{
    if(!err)
    {
        var parts = data.split(",");
        for(var i = 0; i < parts.length; i++)
        {
            var val = parseInt(parts[i]);
            numlist.push(val);
            copiedlist.push(val);
        }
    }
    var times = numlist.length;
    for(var i = 0; i < times; i++)
    {
        var a = numlist[i];
        for(var j = 0; j < i; j++)
        {
            var b = numlist[j];
            var val = test((a + b) / 2);
            //console.log("testing " + a + ", " + b);
            if(val > 0)
            {
                findAndRemove(val);
                var out = "(" + i + ", " + j + "): " + a + " " + b + " -> " + numlist[val];
                console.log(out);
                str += out + "\n";
            }
        }
    }
    for(var i = 0; i < copiedlist.length; i++)
    {
        console.log(copiedlist[i]);
    }
    FS.appendFile("results.txt",str, function(err)
    {
        if(err)
        {
            console.log("failed to write"); 
        }
    });
});