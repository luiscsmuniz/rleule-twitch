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

const ranking = ({ itens }) => {

  const newArray = groupBy(itens, 'tipper')

  const tr = Object.entries(newArray).map(item => {
    let sum = 0
    item[1].forEach(obj => {
      sum += obj.amount
    })

    return ({
      name: item[0],
      points: sum / 100,
    })
  })

  const trItem = tr.sort((a, b) => {
    if (a.points < b.points) {
      return 1;
    }
    if (a.points > b.points) {
      return -1;
    }
    return 0;
  }).map(item => (`
    <tr class="text-center">
      <td>${item.name}</td>
      <td>${item.points}</td>
    </tr>
  `))

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <title>WIG1BOT :: RANKING PIX</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
<style>
  * {
    margin: 0;
    padding: 0;
  }
  body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: 'Oswald', sans-serif;
    background-color: blue; /* For browsers that do not support gradients */
    background-image: linear-gradient(blue, purple, red);
    color: #fff;
  }

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

  .my-custom-scrollbar {
    position: relative;
    height: 100%;
    overflow: auto;
  }
  .table-wrapper-scroll-y {
    display: block;
  }

</style>
</head>
<body>

<div class="container-fluid mt-3">
  <h4 class="text-center">Ranking de donates por pix</h4>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="table-wrapper-scroll-y my-custom-scrollbar">
        <table class="table table-striped mt-3" style="overflow-y: auto; color: #fff">
          <thead>
            <tr class="text-center">
              <th>Usuário</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            ${trItem.join(' ')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

</body>
</html>
`
}



module.exports = ranking
