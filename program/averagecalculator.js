const FS = require("fs");

var filename = "results.txt";
var numberOfValues = 2;
var times = 100;
var findFunction = function(a)
{
    return a * a;
};
var testFunction = function(a)
{
    var root = Math.sqrt(a);
    return (Math.abs(Math.floor(root) - root) < 0.000001) ? 1 : 0;
}

var outputList = [];
var readyToWrite = true;
function sendToOut(str)
{
    outputList.push(str);
    if(outputList.length > 1000 && readyToWrite)
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
    FS.appendFile(filename, str + "\n", function(err)
    {
        if(err)
        {
            console.log("failed to write " + i + ", " + j + ", " + k); 
        }
        readyToWrite = true;
    });
}
function formatResult(rootarr, sqrarr, avg)
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
    str += " -> " + avg;
    return str;
}
function calculate()
{
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
                //we'll also make a list of the modified numbers while we're here
                var avg = 0;
                var vallist = [];
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
                    val = findFunction(val);
                    avg += val;
                    vallist.push(val);
                }
                if(!changed)
                {
                    //nothing changed; get out; we dont want this one
                    continue;
                }
                avg /= temparr.length;
                //we have the average now
                var val = testFunction(avg);
                if(val > 0)
                {
                    var out = formatResult(temparr, vallist, avg);
                    console.log(out);
                    sendToOut(out);
                }
            }
        }
    };
    for(var i = 0; i < times; i++)
    {
        nextLevel(numberOfValues - 1, [i]);
    }
    //finish writing anything that wasn't written to the file
    writeToFile(outputList);
}

module.exports.Run = function(terms, numberOfTimes, fn, testFunc, findFunc)
{
    filename = fn;
    numberOfValues = terms;
    testFunction = testFunc;
    findFunction = findFunc;
    times = numberOfTimes;
    calculate();
};