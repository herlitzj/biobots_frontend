d3.json("/users/all", function(err, data) {
  if(err) throw err;

  data = JSON.parse(data);

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
              console.log("CELL: ", cell)
              return cell;
          });
      }).enter()
      .append('td')
      .html((column) => column.html)
      .attr('class', (column) => column.cl);
});