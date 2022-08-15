$("#dropdownform").submit((event) => {
    const fs = require('fs');
    // prevent page reload
    event.preventDefault();

    const origin = $("#from").val();
    const destination = $("#to").val();
    const departdate = $("#depart").val();
    const returndate = $("#return").val();
    const nexturl = "/flightDirect" + "/" + origin + "/" + destination
    const wholeurl = baseUrl + nexturl

    axios.get(`${baseUrl + nexturl}`)
        .then((response) => {
            console.log(response)
            
            const results = {};
            for(var i=0; i<length(response.data); i++){
                results = results.push(response.data[i]);
            }
            res.send(results)
            // convert JSON object to string
            const data = JSON.stringify(results);

            // write JSON string to a file
            fs.writeFile('hi.txt', data, (err) => {
                if (err) {
                    throw err;
                }
                console.log("JSON data is saved.");
            });


        })
        .catch((error) => {
            window.alert("Incorrect Username or Password");
            window.location.reload();
            return false;
            console.log(error);
        });
});