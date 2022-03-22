const groupBy = (xs, key) => xs.reduce((rv, x) => {
  // eslint-disable-next-line no-param-reassign
  (rv[x[key]] = rv[x[key]] || []).push(x)
  return rv
}, {})

const table = ({ itens }) => {

  const newArray = groupBy(itens, 'name')

  const tr = Object.entries(newArray).map(item => ({
    name: item[0],
    count: item[1].map(obj => obj.name).length,
  }))

  return `
  <!DOCTYPE html>
  <html>
  <head>
  <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet'>
  <style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }

  body {
    font-family: 'Oswald';font-size: 22px;
    background-image: url('https://wig1bot.valandil.repl.co/twitch.jpeg');
  }
  </style>
  </head>
  <body>
  
  <h2 style="color: #fff;">Campeões do cassino do Wig</h2>
  
  <table style="color: #fff; width: 40%;">
    <tr>
      <th>Nome</th>
      <th>Quantidade</th>
    </tr>
    ${tr.sort((a, b) => {
        if (a.count > b.count) {
          return 1;
        }
        if (a.count < b.count) {
          return -1;
        }
        return 0;
      }).map(item => (`
        <tr>
          <td>${item.name}</td>
          <td>${item.count}</td>
        </tr>
      `))}
  </table>
  
  </body>
  </html>
`
}

module.exports = table
