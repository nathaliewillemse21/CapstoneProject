import { createStore } from 'vuex';
import axios from 'axios';

const render = 'https://capstoneproject-k8g5.onrender.com/';
export default createStore({
  namespaced: true,
  state: {
    users: null,
    user: null,
    cart: [],
    selectedProduct: null,
    products: null,
    product: null,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
    },
    ADD_TO_CART(state, product) {
      state.cart.push(product);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
  },
  actions: {
    async fetchUsers(context) {
      try {
        const { data } = await axios.get(`${render}users`);
        context.commit('setUsers', data.results);
      } catch (error) {
        console.error(error);
        alert('Request Failed! Could not retrieve all users!');
      }
    },
    async fetchUser(context, id) {
      try {
        const { data } = await axios.get(`${render}users/${id}`);
        context.commit('setUser', data.result);
      } catch (error) {
        console.error(error);
        alert('Request Failed! Could not retrieve user!');
      }
    },
    async fetchProducts(context) {
      try {
        const { data } = await axios.get(`${render}products`);
        context.commit('setProducts', data.results);
      } catch (error) {
        console.error(error);
        alert('Request Failed! Could not retrieve products from the database.');
      }
    },
    async registerNewUser(context, newUser) {
      try {
        const response = await axios.post(`${render}users/register`, newUser);
        const { data } = response.data;
        if (data.msg) {
          context.dispatch('fetchUsers');
          context.commit('setUser', data.user);
        }
      } catch (e) {
        alert('Request Failed: Could not register user.');
      }
    },
    async updateUser(context) {
      try {
        const { data } = await axios.patch(`${render}users`, context.data);
        if (data) {
          context.commit('fetchUsers');
          context.commit('setUser', data);
          alert('Update Successful');
        }
      } catch (e) {
        console.error(e);
        alert(
          'Request Failed: An error occurred while trying to update the user.'
        );
      }
    },
    async deleteUser({ commit ,dispatch},payload) {
      try {
        const { data } = await axios.delete(`${render}users/delete/${payload.id}`);
        if (data) {
          dispatch('fetchUsers');
          commit('setUser', data);
          console.log('User deleted successfully');
        }
      } catch (e) {
        console.error(e);
        alert('Request Failed: An error occurred while deleting user.');
      }
    },
    addToCart(context, product) {
      context.commit('ADD_TO_CART', product);
    },
    async addProduct(context) {
      try {
        const response = await axios.post(`${render}addProduct`, context.data);
        const { data } = response;
        if (data) {
          context.commit('fetchProducts');
          context.commit('setProduct', data);
        }
      } catch (e) {
        console.error(e.message);
        alert('Request Failed: An error occurred while adding a new product.');
      }
    },
    clearCart(context) {
      context.commit('CLEAR_CART');
    },
    async updateProduct(context) {
      try {
        const { data } = await axios.patch(
          `${render}/updateProduct}`,
          context.data
        );
        if (data) {
          context.commit('fetchProducts');
          alert('Successfully updated product!');
        } else {
          throw new Error('Failed to update product: ');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred: ' + error);
      }
    },
    // async deleteProduct(context, BookID) {
    //   try {
    //     const { data } = await axios.delete(
    //       `${render}products/delete/${BookID}`
    //     );
    //     if (data) {
    //       context.dispatch('fetchProducts');
    //       context.commit('setProduct');
    //     }
    //   } catch (e) {
    //     alert('An error occurred while deleting the product');
    //   }
    // },
    async deleteProduct({ commit, dispatch }, payload) {
      try {
        await axios.delete(`${render}products/delete/${payload.id}`);
        commit("setProducts")
        dispatch("fetchProducts")
      } catch (e) {
        console.log(e)
      }
    }
  },
  modules: {},
});
