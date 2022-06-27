const groupBy = (xs, key) => xs.reduce((rv, x) => {
  // eslint-disable-next-line no-param-reassign
  (rv[x[key]] = rv[x[key]] || []).push(x)
  return rv
}, {})

const compare = (a, b) => {
  if ( a.count < b.count ){
    return -1;
  }
  if ( a.count > b.count ){
    return 1;
  }
  return 0;
}

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
  body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    overflow: auto;
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
    font-family: 'Oswald';font-size: 18px;
    background-image: url('https://wig1bot.valandil.repl.co/twitch.jpeg');
  }
  </style>
  </head>
  <body>
  <table style="color: #fff;">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Quantidade</th>
      </tr>
    </thead>
    <tbody>
      ${tr.sort((a, b) => {
        if (a.count < b.count) {
          return 1;
        }
        if (a.count > b.count) {
          return -1;
        }
        return 0;
      }).map(item => (`
        <tr>
          <td>${item.name}</td>
          <td>${item.count}</td>
        </tr>
      `))}
    </tbody>
  </table>
  
  </body>
  </html>
`
}

module.exports = table
