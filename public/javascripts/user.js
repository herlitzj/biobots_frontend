var path = encodeURIComponent(window.location.pathname);

d3.json("/callapi?path=" + path, function(err, data) {
  if(err) throw err;
  var data = JSON.parse(data);

  var columns = [
      { head: 'ID', cl: 'title',
        html: (row, i) => i},
      { head: 'Live Percent', cl: 'title',
        html: (row) => row.print_data.livePercent},
      { head: 'Dead Percent', cl: 'center',
        html: (row) => row.print_data.deadPercent},
      { head: 'Elasticity', cl: 'center',
        html: (row) => row.print_data.elasticity},
      { head: 'CL Enabled', cl: 'center',
        html: (row) => row.print_info.crosslinking.cl_enabled},
      { head: 'CL Duration', cl: 'center',
        html: (row) => row.print_info.crosslinking.cl_duration},
      { head: 'CL Intensity', cl: 'center',
        html: (row) => row.print_info.crosslinking.cl_intensity}
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
      .data(data.all_prints).enter()
      .append('tr')
      .selectAll('td')
      .data(function(row, i) {
          return columns.map((c) => {
              // compute cell values for this specific row
              var cell = {};
              d3.keys(c).forEach((k) => {
                  cell[k] = typeof c[k] == 'function' ? c[k](row, i) : c[k];
              });
              return cell;
          });
      }).enter()
      .append('td')
      .html((column) => column.html)
      .attr('class', (column) => column.cl);

})

