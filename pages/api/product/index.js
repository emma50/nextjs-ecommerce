import nc from "next-connect";
import axios from "axios";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})

handler.get(async (req, res) => {
  try {
    const products = await axios.get('https://fakestoreapi.com/products')

    products.data.forEach((product, index) => product.quantity = index + 1)

    return res.status(200).json({ products: products.data })
  } catch(e) {
    return res.status(500).json({ message: e.message })
  }
})

export default handler
