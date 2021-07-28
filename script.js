var resultingText = '';

//clear data on new file open
document.getElementById('fileInput').addEventListener('change', function(){
    console.log('change happened');
    resultingText = '';
    document.getElementById('status').innerText = '';
})

document.getElementById('do-stuff').addEventListener('click', function(){
    console.log('Doing stuff');
    //check if file selected
    if(document.getElementById('fileInput').files.length === 0){
        alert('No file selected!');
        return;
    }        
    else{
        if (resultingText == ''){
            document.getElementById('status').innerText = 'Working on file \n';
        }
        else{
            document.getElementById('status').innerText += 'Working on file again, result will be appended to existing! \n';
        }        
        myFile = document.getElementById('fileInput').files[0];
        const reader = new FileReader();
        reader.onload = function(e){
            console.log('load success');
            var text = e.target.result;
            var linebreak = null;
            var lines = null;
            //check for line breaks
            if(text.match(/\r\n/g)){
                document.getElementById('status').innerText += 'Using Windows linebreak (CRLF)! \n';
                linebreak = '\r\n';
                lines = text.split(/\r\n/g);
            }
            else if(text.match(/\n/g)){
                document.getElementById('status').innerText += 'Using Unix linebreak (LF)! \n';
                linebreak = '\n';
                lines = text.split(/\n/g);
            }
            else{
                document.getElementById('status').innerText += 'No linebreaks found! \n';
                return;//or do something else
            }
            
            for(var i = 0; i < lines.length; i++){ 
                //Do modifications to file here
                //In this example it adds index at the beginning of every line.
                resultingText += i + ',' + lines[i] + linebreak;
            }
            document.getElementById('status').innerText += 'Done!';
        }
        reader.onerror = function(){
            alert('FileReader error happened');
            console.log('FileReader error happened');
        }
        reader.readAsText(myFile);
    }
});

document.getElementById('download').addEventListener('click', function(){
    console.log('Downloading');
    if (resultingText === ''){
        alert('No modification happened!');
    }
    else{
        //modification done, create file for download;
        //Some code from https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
        var filename = 'result_' + Date.now().toString() + '.csv'; //Timestamp in case there are multiple files.
        var blob = new Blob([resultingText], {type: 'text/csv'});        
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();
        window.URL.revokeObjectURL(elem.href);        
        document.body.removeChild(elem);
    }
});