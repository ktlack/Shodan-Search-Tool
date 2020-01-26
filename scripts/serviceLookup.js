$(document).ready(function() {

  //button click method
  $('#getButton').click(function(data){

    var domain = $('#domain').val();
    console.log(domain);

    var userApiKey = $('#api_key').val();
    console.log(userApiKey);

    //check to see which service was selected -- if nothing is selected, the app will conduct a basic domain search and return the IPs and hostnames found
    if($('#keywordCheck').prop('checked')){
      var keywordInput = $('#keyword').val();
      console.log(keywordInput);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + "+" + keywordInput;
      console.log(url);

      getData(url);

    }else if($('#vulnCheck').prop('checked')) {
      var vulnInput = $('#CVE').val();
      console.log(vulnInput);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + "+vuln:" + vulnInput;
      console.log(url);

      getData(url);

    }else if($('#portCheck').prop('checked')) {
      var portInput = $('#portNum').val();
      console.log(portInput);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + "+port:" + portInput;
      console.log(url);

      getData(url);

    }else if($('#200').prop('checked')) {
      var httpCode = "200";
      console.log(httpCode);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + "+http.status:" + httpCode;
      console.log(url);

      getData(url);

    }else if($('#302').prop('checked')) {
      var httpCode = "302";
      console.log(httpCode);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + "+http.status:" + httpCode;
      console.log(url);

      getData(url);

    }else if($('#401').prop('checked')) {
      var httpCode = "401";
      console.log(httpCode);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + "+http.status:" + httpCode;
      console.log(url);

      getData(url);

    }else if($('#403').prop('checked')) {
      var httpCode = "403";
      console.log(httpCode);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + "+http.status:" + httpCode;
      console.log(url);

      getData(url);

    }else if($('#404').prop('checked')) {
      var httpCode = "404";
      console.log(httpCode);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + "+http.status:" + httpCode;
      console.log(url);

      getData(url);

    }else if($('#503').prop('checked')) {
      var httpCode = "503";
      console.log(httpCode);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + "+http.status:" + httpCode;
      console.log(url);

      getData(url);

    }else if($('#msiis').prop('checked')) {
      var osSearch = "Microsoft IIS";
      console.log(osSearch);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + '+"' + osSearch + '"';
      console.log(url);

      getData(url);

    }else if($('#linux').prop('checked')) {
      var osSearch = "Linux";
      console.log(osSearch);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + '+"' + osSearch + '"';
      console.log(url);

      getData(url);

    }else if($('#apache').prop('checked')) {
      var osSearch = "Apache";
      console.log(osSearch);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + '+"' + osSearch + '"';
      console.log(url);

      getData(url);

    }else if($('#nginx').prop('checked')) {
      var osSearch = "NGINX";
      console.log(osSearch);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + '+"' + osSearch + '"';
      console.log(url);

      getData(url);

    }else if($('#vnc').prop('checked')) {
      var osSearch = "VNC";
      console.log(osSearch);
      var base = "https://api.shodan.io/shodan/host/search?key=";
      var url = base + userApiKey + '&query=hostname:' + domain + '+"' + osSearch + '"';
      console.log(url);

      getData(url);
    };
  });

  $("#clearButton").click(function() {
    pageReload();
  });
});

//provides the user the ability to quickly reset the page
function pageReload(){
  location.reload();
};

function getData(url) {
  $.ajax({
    url: url,
    method: "GET",
    success: function(json) {
      processData(json);
    }
  });
};


function processData(data) {

  //exception handling check
  resultsLen = data['total'];
  if (resultsLen == "0"){
    $('#serviceError').html('No results found');
  }else{
    $('#serviceError').html('');

    //provides number of hosts found
    hostData = data['matches'];
    let resultsLen = hostData.length;
    $('#resultsNum').html('Results: ' + resultsLen);

    for (hostNum in hostData) {
      var hostInfo = hostData[hostNum];
      var hostIP = hostInfo["ip_str"];

      var hostList =[];
      var hostnames = hostInfo["hostnames"];
      for (hosts in hostnames) {
        hostList.push(hostnames[hosts]);
      };
      hLen = hostList.length;
      hostnames = "<ul>";
      for (i = 0; i < hLen; i++) {
        hostnames += "<li>" + hostList[i] + "</li>";
      };
      hostnames += "</ul>";

      //build the table
      var tableRow = "<tr><td>" + hostIP + "</td><td>" + hostnames + "</td></tr>"
      $("#output").append(tableRow);
    };
  };
};
