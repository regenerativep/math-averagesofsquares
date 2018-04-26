var FS = require("fs");

var list = "";
for(var i = 0; i < 1000; i++)
{
    list += ((i * (i + 1)) / 2) + ",";
}

FS.appendFile("./triangles.txt", list, function(err)
{
    if(err)
    {
        console.log("something bad happened");
    }
});