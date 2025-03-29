
# Primera entrega Proyecto Backend Avanzado 1

Endpoints Products

POST: http://localhost:8080/api/products
{
  "title": "Macbook Pro M2 ",
  "description": "Macbook Pro Chip M2 16B RAM",
  "code": "LAP131",
  "price": 3500,
  "status": true,
  "stock": 10,
  "category": "Electrónica",
  "thumbnails": [
    "images/laptop12.png",
    "images/laptop13.png"
  ]
}
GET: http://localhost:8080/api/products/4
GET: http://localhost:8080/api/products
PUT: http://localhost:8080/api/products/1
{
  "title": "Nuevo Producto Actualizado",
  "description": "Descripción actualizada",
  "code": "NUEVO123",
  "price": 150,
  "status": true,
  "stock": 50,
  "category": "Actualizado",
  "thumbnails": ["img1.jpg", "img2.jpg"]
}

DELETE: http://localhost:8080/api/products/1

Endpoints Carts
POST: http://localhost:8080/api/carts
{
  "id": "1",
  "products": []
}
POST: http://localhost:8080/api/carts/2/product/3
{
    "id": "2",
    "products": [
        {
            "product": "3",
            "quantity": 1
        }
    ]
}

GET: http://localhost:8080/api/carts/1


