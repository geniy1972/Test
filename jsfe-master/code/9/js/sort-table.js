var compare = {
  name: function (a, b) {
    if (a < b) {
      return -1;
    } else {
      return a > b ? 1 : 0;
    }
  },
  time: function (a, b) {
    a = a.split(':');
    b = b.split(':');

    a = Number(a[0]) * 60 + Number(a[1]);
    b = Number(b[0]) * 60 + Number(b[1]);

    return a - b;
  },
  date: function (a, b) {
    a = new Date(a);
    b = new Date(b);

    return a - b;
  }
};

$('.sortable').each(function () {
  var $table = $(this);
  //console.log($table);
  var $tbody = $table.find('tbody');
  console.log($tbody);
  var $controls = $table.find('th');

  var rows = $tbody.find('tr').toArray();
  //console.log(rows);

  $controls.on('click', function () {
    var $header = $(this);

    var order = $header.data('sort');

    var column;

    if ($header.is('.ascending') || $header.is('.descending')) {

      $header.toggleClass('ascending descending');

      $tbody.html(rows.reverse());

    } else {

      $header.addClass('ascending');

      $header.siblings().removeClass('ascending descending');

      if (compare.hasOwnProperty(order)) {
        column = $controls.index(this);

        rows.sort(function (a, b) {
          a = $(a).find('td').eq(column).text();
          b = $(b).find('td').eq(column).text();

          return compare[order](a, b);

        });

        $tbody.html(rows);
      }
    }
  });
});