# back-end


# Routes
| Method | Location               | Result                                 | Restricted  |
|--------|------------------------|:--------------------------------------:|------------:|
| GET    | /                      | sends a welcome msg                    | no          |
| GET    | /api/recipies          | gets a list of all  recipies           | no          |
| GET    | /api/recipies/:id      | gets a recipe by the given id          | no          |
| GET    | /api/auth/recipies/:id | gets all user recipes                  | yes         |
|--------|------------------------|:--------------------------------------:|------------:|
| POST   | api/auth/login         | user login                             | no          |
| POST   | api/auth/signup        | user signup                            | no          |
| POST   | api/recipies           | adds new recipe                        | yes         |
| POST   | api/recipies/c/:id     | adds a new category                    | yes         |
|        |                        | to the given recipe id                 |             |  
| POST   | api/recipies/i/:id     | adds a new ingredient                  | yes         |
|        |                        | to the given recipe id                 |             |
|--------|------------------------|:--------------------------------------:|------------:|
| PUT    | api/recipies/:id       | updates the recipe with the given id   | yes         |