function readyPage() {
  get();
};
window.onload = readyPage;

var get = function() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function(data) {
    if (req.readyState == 4 && req.status == 200) {
      console.log(data);
    };
  };
  req.open('GET', 'https://biobots-api.herokuapp.com/users/all', true);
  req.send();
}

var data = { 
    users: [ { 
        email: "user25@gmail.com",
        serial: "25" 
    }, {
        email: "user43@gmail.com",
        serial: "43" 
    }, {
        email: "user34@gmail.com",
        serial: "34" 
    } ]
};


var columns = [
    { head: 'Email', cl: 'title',
      html: (row) => '<a href="https://biobots-api.herokuapp.com/users/' + row.email + '/prints">' +  row.email +'</a>'},
    { head: 'Serial', cl: 'center',
      html: (row) => row.serial},
];

// create table
var table = d3.select('body')
    .append('table');

// create table header
table.append('thead').append('tr')
    .selectAll('th')
    .data(columns).enter()
    .append('th')
    .attr('class', (column) => column.cl)
    .text((column) => column.head);

// create table body
table.append('tbody')
    .selectAll('tr')
    .data(data.users).enter()
    .append('tr')
    .selectAll('td')
    .data(function(row, i) {
        return columns.map((c) => {
            // compute cell values for this specific row
            var cell = {};
            d3.keys(c).forEach((k) => {
                cell[k] = typeof c[k] == 'function' ? c[k](row) : c[k];
            });
            return cell;
        });
    }).enter()
    .append('td')
    .html((column) => column.html)
    .attr('class', (column) => column.cl);
