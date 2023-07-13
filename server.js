const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const PORT = 2410;

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(cors());
app.use(morgan('dev'));
app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));


const products = [
  {
    prodCode: "DS2S245", category: "Dining", desc: ["Two seater Dining Set", "Built from High quality wood", "1 year warranty"], img: "https://hometown.gumlet.io/media/product/61/9353/47156/1.jpg?mode=fill&w=335&h=335&dpr=1.3", ingredients: [{ ingName: "Dining Table", qty: 1 }, { ingName: "Chair", qty: 2 }], title: "Two seater Dining Set"
  },
  {
    prodCode: "DS6S761", category: "Dining", desc: ["Six Seater Dining Set in Antique Cherry Colour", "Assembly by Skilled Carpenters", "Made from Teak wood"], img: "https://hometown.gumlet.io/media/product/03/9453/94498/1.jpg?mode=fill&w=335&h=335&dpr=1.3", ingredients: [{ ingName: "Dining Table", qty: 1 }, { ingName: "Chair", qty: 4 }, { ingName: "Bench", qty: 1 }], title: "Six Seater Dining Set"
  }, {
    prodCode: "DS4S177", category: "Dining", desc: ["Mild Steel Four Seater Dining Set in Black Colour", "Knock-down construction for easy transportation"], img: "https://images.woodenstreet.de/image/data/dining-set/4-seater/alanis-compact-4-seater-dining-set-with-4-chairs-walnut-finish/updated/1.jpg", ingredients: [{ ingName: "Dining Table", qty: 1 }, { ingName: "Chair", qty: 4 }], title: "Mild Steel Dining Set"
  },
  {
    prodCode: "DC2S705", category: "Dining", desc: ["Solid Wood Dining Chair Set of Two in Dark Walnut Colour", "Beautiful design carved on dining chair", "Dining chair seat upholstered in dark brown Fabric"], img: "https://hometown.gumlet.io/media/product/83/2273/43120/1.jpg?mode=fill&h=360&w=360&dpr=1.5", ingredients: [{ ingName: "Chair", qty: 2 }], title: "Dining Chair Set"
  },
  { prodCode: "BN1S388", category: "Dining", desc: ["Solid Wood Dining Bench in Dark Walnut Colour", "Comfortable bench for a relaxed dinner"], img: "https://i0.wp.com/magnoliahome.co.in/wp-content/uploads/2020/12/Valencia-Dining-Bench-1.1-scaled.jpg", ingredients: [{ ingName: "Bench", qty: 1 }], title: "Dining Bench" },
  {
    prodCode: "SF2S532", category: "Drawing", desc: ["Characteristic Rising Track Arm Rest Design", "Premium High Gloss Leatherette Upholstery", "Independent Headrest And Lumber Support"], img: "https://ii1.pepperfry.com/media/catalog/product/f/i/800x400/fidel-2-seater-sofa-in-camel-yellow-colour-by-casacraft-fidel-2-seater-sofa-in-camel-yellow-colour-b-pestjh.jpg", ingredients: [{ ingName: "Sofa", qty: 1 }], title: "Two Seater Sofa"
  },
  {
    prodCode: "SF2S206", category: "Drawing", desc: ["Two Seater Sofa in Blue Colour", "Assembly by Skilled Carpenters"], img: "https://images.woodenstreet.de/image/data/fabric-sofa/casper-sofa/updated/olive-gold/1-seater/updated/5.jpg", ingredients: [{ ingName: "Sofa", qty: 1 }], title: "Two Seater Sofa"
  },
  {
    prodCode: "SFBD311", category: "Drawing", desc: ["Sofa Cum bed in Brown Colour", "Ply-wood construction with hand polished finish", "Removable fabric cover on best quality foam mattress", "Throw cushions and bolsters come with the product"], img: "https://m.media-amazon.com/images/I/61+Cx6N9qcL._AC_UF894,1000_QL80_DpWeblab_.jpg", ingredients: [{ ingName: "Sofa", qty: 1 }, { ingName: "Cushions", qty: 2 }], title: "Sofa cum Bed"
  },
  {
    prodCode: "BDQS381", category: "Bedroom", desc: ["Wood Box Storage King Size Bed in Wenge Colour ", "Box Storage included for Maximum space utilization", "Mattress is included"], img: "https://m.media-amazon.com/images/I/71rmqJwVAcL._AC_UF894,1000_QL80_DpWeblab_.jpg", ingredients: [{ ingName: "Bed", qty: 1 }, { ingName: "Mattress", qty: 2 }], title: "King size Bed"
  },
  {
    prodCode: "BDQS229", category: "Bedroom", desc: ["Wood Hydraulic Storage Queen Size Bed", "Half hydraulic storage", "Superior E2 grade MDF used with melamine finish"], img: "https://5.imimg.com/data5/LC/FI/SI/SELLER-30353797/queen-size-bed.jpg", ingredients: [{ ingName: "Bed", qty: 1 }], title: "Queen size Bed"
  },
  {
    prodCode: "ST1T425", category: "Study", desc: ["Wood Study Table in Walnut Colour", "Assembly by Skilled Carpenters", "Built from High Quality Wood"], img: "https://furniturehub.pk/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-07-at-1.03.38-PM-1.jpeg", ingredients: [{ ingName: "Study Table", qty: 1 }], title: "Study Table"
  },
  {
    prodCode: "ST1T588", category: "Study", desc: [" Wood Study Table in Highgloss White & Blue Colour", "Study table comes with bookshelf on top, 5 drawers & 1 open shelf", "Superior quality MDF with stain resistant melamine finish"], img: "https://wakefitdev.gumlet.io/img/study-tables/neptune/0c.jpg?w=732", ingredients: [{ ingName: "Study Table", qty: 1 }], title: "Study Table"
  }
]

const users = [
  { username: "jack@gmail.com", password: "jack1234", role: "user" },
  { username: "ali@gmail.com", password: "ali1234", role: "user" },
  { username: "admin@gmail.com", password: "admin1234", role: "admin" },
]

const originalProducts = [...products]


// @ GET
// @ ROUTE : /reset
app.get('/reset', (req, res) => {
  products = [...originalProducts]
  return res.status(200).json('Data Reset Successfully')
})


// @ GET
// @ ROUTE : /products
app.get('/products', (req, res) => {
  return res.status(200).json(products)
})


// @ DELETE
// @ ROUTE : /product/delete/:code
app.delete('/product/delete/:code', (req, res) => {
  let { code } = req.params;
  let index = products.findIndex(p => p.prodCode === code);
  if (index < 0) {
    return res.status(404).send("Product Not Found")
  }
  let deletedProduct = products.splice(index, 1)
  return res.status(200).json(deletedProduct)
})


// @ GET
// @ ROUTE : /getProductByProdcode/:prodCode
app.get('/getProductByProdcode/:prodCode', (req, res) => {
  let { prodCode } = req.params;
  let filteredProduct = products.find(p => p.prodCode === prodCode)
  return res.status(200).json(filteredProduct);
})


// @ GET
// @ ROUTE : /getProductByCategory/:category
app.get('/getProductByCategory/:category', (req, res) => {
  let { category } = req.params;
  let filteredProduct = products.filter(p => p.category === category)
  return res.status(200).json(filteredProduct);
})


// @ POST
// @ ROUTE : /products
app.post('/products', (req, res) => {
  let { prodCode, img, category, ingredients, title, desc } = req.body;
  if (!prodCode || !img || !category || !ingredients || !title || !desc) {
    return res.status(400).send('Please Provide All Details')
  }
  products.push({ ...req.body })
  return res.status(200).json({ ...req.body })
})



// @ PUT
// @ ROUTE : /products
app.put('/products/edit/:code', (req, res) => {
  let { code } = req.params;
  let index = products.findIndex(p => p.prodCode === code);
  if (index < 0) {
    return res.status(400).send('Product Not Found')
  }
  let updatedProduct = { ...products[index], ...req.body };
  products[index] = updatedProduct
  return res.status(200).json(updatedProduct)
})



// @ POST
// @ ROUTE : /login
app.post('/login', (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).send("Please Provide All Credentials")
  }

  let existingUser = users.find(u => u.username === username);

  if (!existingUser) {
    return res.status(404).send("Email Doesn't Exist. Please Register")
  }

  if (existingUser.password !== password) {
    return res.status(404).send("Invalid Credentials")
  }

  return res.status(200).send(existingUser)
})