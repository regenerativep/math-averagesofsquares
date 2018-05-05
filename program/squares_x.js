//use 3 factors for the average function here instead of 2
const FS = require("fs");
var squarelist = [];
var numberOfValues = 3;
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
function formatResult(rootarr, sqrarr, sqrnum)
{
    var str = "(";
    if(rootarr.length > 0)
    {
        str += rootarr[0];
    }
    for(var i = 1; i < rootarr.length; i++)
    {
        str += ", " + rootarr[i];
    }
    str += "):";
    for(var i = 0; i < sqrarr.length; i++)
    {
        str += " " + sqrarr[i];
    }
    str += " -> " + squarelist[sqrnum];
    return str;
}
var outputList = [];
var readyToWrite = true;
function sendToOut(str)
{
    outputList.push(str);
    if(outputList.length > 100 && readyToWrite)
    {
        writeToFile(outputList.slice(0, outputList.length));
        outputList.splice(0, outputList.length);
    }
}
function writeToFile(list)
{
    readyToWrite = false;
    var str = "";
    for(var i = 0; i < list.length; i++)
    {
        str += list[i] + "\n";
    }
    FS.appendFile("results_square_x-" + numberOfValues + ".txt", str + "\n", function(err)
    {
        if(err)
        {
            console.log("failed to write " + i + ", " + j + ", " + k); 
        }
        readyToWrite = true;
    });
}
var times = 100;
for(var i = 1; i <= times; i++)
{
    var a = i * i;
    squarelist.push(a);

    var nextLevel = function(level, arr)
    {
        for(var j = 1; j <= arr[arr.length - 1]; j++)
        {
            var temparr = arr.slice(0, arr.length);
            temparr.push(j)
            if(level > 1)
            {
                //still have more levels to go down
                nextLevel(level - 1, temparr);
            }
            else
            {
                //we're at the lowest level
                //look for an answer here
                
                //find the average
                //we'll also make a list of the square numbers while we're here
                var avg = 0;
                var sqrlist = [];
                var lastnum = temparr[0];
                var changed = false;
                for(var k = 0; k < temparr.length; k++)
                {
                    var val = temparr[k];
                    if(!changed)
                    {
                        if(val != lastnum)
                        {
                            changed = true;
                        }
                    }
                    lastnum = val;
                    val *= val;
                    avg += val;
                    sqrlist.push(val);
                }
                if(!changed)
                {
                    //nothing changed; get out; we dont want this one
                    continue;
                }
                avg /= temparr.length;
                //we have the average now
                var sqr = testSquare(avg);
                if(sqr > 0)
                {
                    var out = formatResult(temparr, sqrlist, sqr);
                    console.log(out);
                    sendToOut(out);
                }
            }
        }
    };
    nextLevel(numberOfValues - 1, [i]);


    /*for(var j = 0; j < i; j++)
    {
        var b = j * j;
        for(var k = 0; k < j; k++)
        {
            var c = k * k;
            var sqr = testSquare((a + b + c) / 3);
            if(sqr > 0)
            {
                var out = formatResult([i, j, k], [a, b, c], sqr);
                console.log(out);
                sendToOut(out);
            }
        }
    }*/
}
//finish writing anything that wasn't written to the file
writeToFile(outputList);