$(document).ready(function($) {

  //button click method
  $("#getButton").click(function() {

    var domain = $('#domain').val();
    console.log(domain);

    var userApiKey = $('#api_key').val();
    console.log(userApiKey);

    makeURL(domain, userApiKey);
    getData(domain, userApiKey);

  });

  $("#clearButton").click(function() {
    pageReload();
  });
});

//provides the user the ability to quickly reset the page
function pageReload(){
  location.reload();
};

//creates the url for the requested domain
function makeURL(domain, userApiKey) {
  var base = "https://api.shodan.io/shodan/host/search?key=";
  var url = base + userApiKey + '&query=hostname:' + domain;
  console.log(url);
  return url;
};

function getData(domain, userApiKey) {
  $.ajax({
    url: makeURL(domain, userApiKey),
    method: "GET",
    success: function(json) {
      processData(json);

    }
  });
}

function processData(data) {

  //exception handling check -- used if the user inputs a URL incorrectly, or if no results are returned
  resultsLen = data['total'];
    if (resultsLen == "0"){
      $('#error').html('No results found');
    }else{
      $('#error').html('');

      hostData = data["matches"];
      let resultsLen = hostData.length;
      $('#resultsNum').html('Results: ' + resultsLen);

      //these lists are passed to the chart
      vulnNum = [];
      hostIPData = [];

      for (hostNum in hostData) {
        var hostInfo = hostData[hostNum];
        var hostIP = hostInfo["ip_str"];
        hostIPData.push(hostIP);

        var port = hostInfo["port"];

        //check to see if host has vulnerabilities
        var vulnCheck = hostInfo.hasOwnProperty("vulns");
        if (vulnCheck === true) {
          vulnIcon = '<span class="center"><img src="images/warning.png" height="30" />';
        }else{
          vulnIcon = '<span class="center"><img src="images/check-mark.png" height="30" />';
        }

        vulnList = [];
        vulnData = hostInfo["vulns"];
        for (vuln in vulnData) {
          vulnList.push(vuln);
        };
        vLen = vulnList.length;
        vulnNum.push(vLen);

        //check to see if server infomation is provided -- if not leave it blank
        var httpCheck = hostInfo.hasOwnProperty("http");
        if (httpCheck === true) {
          httpData = hostInfo["http"];
          for (httpNum in httpData){
            var serverCheck = httpData.hasOwnProperty("server");
            if (serverCheck === true) {
              var server = hostInfo["http"]["server"];
            }else{
              var server = ("");
            };
          };
        }else{
          var server = ("");
        };

        var hostList =[];
        var hostnames = hostInfo["hostnames"];
        for (hosts in hostnames) {
          hostList.push(hostnames[hosts]);
        };
        hLen = hostList.length;
        hostnames = "<ul class='nobullet'>";
        for (i = 0; i < hLen; i++) {
            hostnames += "<li>" + hostList[i] + "</li>";
        };
        hostnames += "</ul>";

        //build the table
        var tableRow = "<tr><td>" + hostIP + "</td><td>" + port + "</td><td>" + server + "</td><td>" + hostnames + "</td><td>" + vulnIcon + "</td></tr>"
        $("#output").append(tableRow);
      };

      drawChart(vulnNum, hostIPData);
    };
};


function drawChart(dataArray, titles){
  var ctx = document.getElementById("myLineChart").getContext("2d");

  var myLineChart = new Chart(ctx, {
    type: "bar",
    data: {
      datasets: [
        {
          data: dataArray,
          fill: false,
          borderColor: "#424949",
          borderWidth: 2,
          backgroundColor: "#D35400",
          label: "Vulnerabilities",
        }
      ],
      labels: titles
    },
    options: {
      showLines: true,
      title: {
        display: true,
        fontSize: 24,
        fontStyle: 'bold',
        text: "Number of Vulnerabilities Found per IP Address",
      }
    }
  });
}
