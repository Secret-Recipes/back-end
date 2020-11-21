# back-end


# Routes
| Method | Location               | Result                                             | Restricted  | Object Type |
|--------|------------------------|----------------------------------------------------|-------------|-------------|
| GET    | /                      | sends a welcome msg                                | no          |
| GET    | /api/recipies          | gets a list of all  recipies                       | no          |
| GET    | /api/recipies/:id      | gets a recipe by the given id                      | no          |
| GET    | /api/auth/recipies/:id | gets all user recipes                              | yes         |
|--------|------------------------|----------------------------------------------------|-------------|
| POST   | api/auth/login         | user login                                         | no          |A
| POST   | api/auth/signup        | user signup                                        | no          |B
| POST   | api/recipies           | adds new recipe                                    | yes         |
| POST   | api/recipies/c/:id     | adds a new category                                | yes         |C
|        |                        | to the given recipe id                             |             |  
| POST   | api/recipies/i/:id     | adds a new ingredient                              | yes         |C
|        |                        | to the given recipe id                             |             |
|--------|------------------------|----------------------------------------------------|-------------|
| PUT    | api/recipies/:id       | updates the recipe with the given id               | yes         |
| PUT    | /api/recipies/c/:id    | updates the category with the given id             | yes         |
| PUT    | /api/recipies/i/:id    | updates the ingredients with the given id          | yes         |
| PUT    | /api/recipies/h/:id    | updates the header of the recipe with the given id | yes         |




# Objects
| Type   | data                                                                                     |       
|--------|------------------------------------------------------------------------------------------|
| A      | {"username": "johndoe", "password": "abc12345"}                                          |
| B      | {"username": "Dylan", "email": "dylan@yaho.com", "password": "jacob123"}                 |
| C      | {"name": "hello world"}                 |
                  
