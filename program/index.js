var AvgCalc = require("./averagecalculator.js");
var squarelist = [];
var highestInList = 0;
var testfunc = function(n)
{
    for(var i = 0; i < squarelist.length; i++)
    {
        if(n == squarelist[i])
        {
            return i;
        }
    }
    return -1;
};
var findfunc = function(val)
{
    val *= val;
    if(val > highestInList)
    {
        squarelist.push(val);
    }
    return val;
};
AvgCalc.Run(2, 100, "testresults.txt", testfunc, findfunc);