<p align="center">
    <img width="70%" src="https://imgur.com/t0mtkR9.png" alt="Project Image"/>
</p>

<h1 align="center">RocketShoes</h1>
<p align="center">Rocketseat - Ignite - <strong>Challenges of chapter II</strong></p>
<p align="center">
  <a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-installation-and-execution">Installation and execution</a>
</p>

## 🔥 About the project


## 🌵 Fake API with JSON Server
We will use JSON server to simulate a REST API that will make the data in the `server.json` file available in the `http://localhost:3333/stock` and `http://localhost:3333/products` paths.

## 💾 Persisting Cart data with localStorage
We will use the **localStorage API** to persist the cart data in the browser in a key:value fashion similar to JSON. To save the data we will use the **setItem** method with the **@RocketShoes:cart** key and the cart variable that must be a string: ``localStorage.setItem('@RocketShoes:cart', cart)``. In order to retrieve the data we will use the **getItem** method: ``const storagedCart = localStorage.getItem('@RocketShoes:cart');``

## 🥪 Showing erros with Toastify
We will use a lib called **toastify-react** to show error messages in a fast and temporary manner


## 💻 Installation and execution
To install: `yarn install`<br>
To create fake API with JSON server: `yarn server`<br>
To run the React app: `yarn start`<br>
To run the automated tests: `yarn test`<br>
